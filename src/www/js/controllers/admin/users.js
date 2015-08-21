"use strict";

app.controller('AdminUsersCtrl', function ($scope, $state, User) {

	$scope.users = [];
	$scope.user = {};

	$scope.load = function(){
		User.query().$promise.then(function(result){
			$scope.users = result.list;
		});
	}

	$scope.load();

	$scope.reset = function(){
		$scope.user = {};
	}

	$scope.edit = function(user){
		$scope.user = user;
		
	}

	$scope.save = function(user){
		if(user._id){
			User.update({_id: user._id}, user).$promise.then(function(){
				$scope.load();
			})
		} else {
			User.create(user).$promise.then(function(){
				$scope.load();
			});
		}
		$scope.user = {};
	}

	$scope.delete = function(user){
		User.delete({_id: user._id}, user).$promise.then(function(){
			$scope.load();
		})
	}

});