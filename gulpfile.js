var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var sh = require('shelljs');
var es = require('event-stream');
var bowerFiles = require('main-bower-files')();
var gulpFilter = require('gulp-filter');
var del = require('del');

var paths = {
	sass: ['./src/*/sass/**/*.scss'],
	jade: ['./src/*/jade/**/*.jade'],
	js: ['./src/*/js/**/*.js']
};

// additional, not recognized bower files
bowerFiles
	.push("./src/lib/bootstrap/dist/css/bootstrap.css");


gulp.task('sass', function(done) {
	// www
	es.concat(
		gulp.src('./src/www/sass/style.scss')
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(gulp.dest('./www/css'))
			.pipe(minifyCss({
				keepSpecialComments: 0
			}))
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest('./www/css/')),
		// mobile
		gulp.src('./src/mobile/sass/style.scss')
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(gulp.dest('./mobile/www/css'))
			.pipe(minifyCss({
				keepSpecialComments: 0
			}))
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest('./mobile/www/css/'))
	).on('end', done);
});


gulp.task('jade', function(done) {
	// TODO: get from config
	var YOUR_LOCALS = {
		mobile: {
			title: "Mobile App"
		},
		www: {
			title: "Web App"
		}
	};
	es.concat(
		gulp.src('./src/www/jade/**/*.jade')
			.pipe(jade({
				locals: YOUR_LOCALS,
				pretty: true
			}))
			.pipe(gulp.dest('./www/')),
		gulp.src('./src/mobile/jade/**/*.jade')
			.pipe(jade({
				locals: YOUR_LOCALS,
				pretty: true
			}))
			.pipe(gulp.dest('./mobile/www/'))
	).on('end', done);
});


gulp.task("bower-files", function(done){

	var filterForWww = gulpFilter(['*','!*ionic*']);
	var filterForMobile = gulpFilter(['*','!*bootstrap*']);
	del([
		'./www/lib/**/*',
		'./mobile/www/lib/**/*'
	], function(){
		gulp.src(bowerFiles)
			.pipe(filterForWww)
			.pipe(gulp.dest("./www/lib"))
			.pipe(filterForWww.restore())
			.pipe(filterForMobile)
			.pipe(gulp.dest("./mobile/www/lib"))
			.on('end',done)
	})
});

gulp.task('js', function(done) {
		//.pipe( uglify() )
		//.pipe( concat('all.min.js'))
	es.concat(
		gulp.src('./src/common/js/**/*.js')
			.pipe( gulp.dest('./www/js/'))
			.pipe( gulp.dest('./mobile/www/js/')),
		gulp.src('./src/mobile/js/**/*.js')
			.pipe( gulp.dest('./mobile/www/js/')),
		gulp.src('./src/www/js/**/*.js')
			.pipe( gulp.dest('./www/js/'))
	).on('end',done);
});


gulp.task('nodemon', function () {
	nodemon({
		script: 'index.js',
		ext: 'js json',
		ignore: ["src/*","www/*","mobile/*"],
		env: { 'NODE_ENV': 'development' }
	})
})

gulp.task('watch', function() {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.js, ['js']);
});

gulp.task('build', ['sass','jade','js','bower-files'])

gulp.task('serve', ['watch','nodemon']);

gulp.task('default',['build','serve']);