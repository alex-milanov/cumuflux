"use strict";

// TODO: convert tojson and delegate the rootPath to ../index.js

var path = require('path');
var rootPath = path.normalize(path.join(__dirname,'/../..'));
var apiPath = path.normalize(path.join(rootPath,'api'));

var _path = {
	root: rootPath,
	api: path.join(rootPath,'api'),
	models: path.join(rootPath,'api','models'),
	routes: path.join(rootPath,'api','routes'),
	static: path.join(rootPath,'www')
}

module.exports = {
	app: {
		title: 'Hybrid Boilerplate',
		description: '',
		keywords: ''
	},
	root: rootPath,
	path: _path,
	port: process.env.PORT || 3000,
	templateEngine: 'jade',
	sessionSecret: 'tumbalumbapickachu',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	languages: ['bg','en'],
	defaultLanguage: 'bg',
	roles: ['anon','admin','user'],
	userRoles: ['user','publisher']
};