"use strict";

app.factory('User', ['$resource', function($resource) {
	
	var defaultActions = {
		create: {
			method: 'POST'
		},
		update: {
			method: 'PUT'
		},
		query: {
			method: 'GET',
			isArray: false
		}
	}

	var User = $resource('/api/users/:_id', { _id: '@_id' }, defaultActions);

	return User;
}]);