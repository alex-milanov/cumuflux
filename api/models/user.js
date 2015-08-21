"use strict";


var mongoose = require('mongoose');

// define the schema for our user model
// role - admin, user
var userSchema = mongoose.Schema({
	name : String,
	active: { type: Boolean, default: false },
	role : { type: String, default: 'user' },
	type : { type: String },
	email : String,
	password : String,
	//salt : String,
	registerDate : { type: Date, default: Date.now }
})


/**
 * Hook a pre save method to hash the password
 */
userSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		//this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
        next()
	} else {
        // TODO: To be fixed 
        next(new Error('The password is not valid'))
    }
})

/**
 * Create instance method for hashing a password
 */
userSchema.methods.hashPassword = function(password) {
    return require('crypto').createHash('sha256').update(password).digest('hex');    
}

/**
 * Create instance method for authenticating user
 */
userSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
}


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)
