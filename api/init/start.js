"use strict";

var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

function createAdminIfNotExists(){

	var userData = {
		name: 'Admin',
		email: 'admin',
		role: 'admin',
		active: true,
		password: '12345678'
	}

	User.findOne({email:'admin', role: 'admin'}, function(err, foundUser){
		//console.log(err, foundUser);
		if(!foundUser){
			var user = new User(userData);
			user.save(function(err, savedUser){
				console.log(err, savedUser);
			})
		}
	})

}

module.exports = function(){
	
	// create admin
	createAdminIfNotExists();

	// load initial data

}