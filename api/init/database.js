"use strict";

var mongoose = require('mongoose');
var chalk = require('chalk');

exports = module.exports = function(config){
	var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
		if (err) {
			console.error(chalk.red('Could not connect to MongoDB!'));
			console.log(chalk.red(err));
		}
	});
	return db;
};