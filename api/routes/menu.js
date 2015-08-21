"use strict"

var fs = require("fs");

module.exports = function(app, config) {

	app.route('/api/menu')
		.get(function(req, res, next){
			fs.readFile(config.path.root+"/config/www/menu.json",'utf-8',function(err, data){
				if(data){
					data = JSON.parse(data);
					res.json(data);
				} else {
					console.log(err);
					next();
				}
			})
		});


};