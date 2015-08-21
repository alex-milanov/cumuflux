'use strict'

module.exports = function(app, config) {

	var auth = require('../controllers/auth');

	app.route('/api/login')
		.post(auth.login);

	app.route('/api/register')
		.post(auth.register);


	app.get('/api/logout', auth.logout);

	app.route('/api/profile')
		.get(auth.requiresLogin(config.userRoles),function(req, res){
			res.jsonp({
				name: req.user.name,
				email: req.user.email,
				role: req.user.role
			});
		})


};