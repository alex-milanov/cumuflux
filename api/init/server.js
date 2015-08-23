"use strict";

var path = require('path');
var http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var mongoStore = require('connect-mongo')({
	session: session
});
var flash = require('connect-flash');


var fileUtil = require('../util/file');

// restify
var restify = require("iblokz-node-restify");
var restMap = require("../../config/rest/map.json");

module.exports = function(config, db){
	// declare our app
	var app = express();

	// Initialize models
	fileUtil.walk(config.path.models, /(.*)\.(js$|coffee$)/).forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// init additional model from restify
	restify.loadModel(restMap, db);

	// config stuff
	/*
	app.set('views',__dirname+'/../app/views');
	app.set('view engine','jade');
	*/

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
			res.send(200);
		}
		else {
			next();
		}
	});


	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		}),
		cookie: config.sessionCookie,
		name: config.sessionName
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	// serve static
	// TODO - move this logic to different ports for www && ionic
	app.use(express.static(config.path.static));

	app.use(require('connect-livereload')({
		port: 35729
	}));

	/*
	fileUtil.walk('./app/middleware', /(.*)\.(js$|coffee$)/).forEach(function(middlewarePath) {
		require(path.resolve(middlewarePath))(app);
	});
*/

	// Load Routes
	fileUtil.walk(config.path.routes, /(.*)\.(js$|coffee$)/).forEach(function(routePath) {
		require(path.resolve(routePath))(app, config);
	});

	// TODO: load additional routes
	restify.initRoutes(app,restMap,{},db);

	return app;
}