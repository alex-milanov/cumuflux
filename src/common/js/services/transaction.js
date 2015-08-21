"use strict";

app.factory('Transaction', ['$resource', function($resource) {
	
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

	var Transaction = $resource('http://localhost:3000/api/transactions/:_id', { _id: '@_id' }, defaultActions);

	return Transaction;
}]);