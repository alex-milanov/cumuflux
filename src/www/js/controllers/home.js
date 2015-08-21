"use strict";

app.controller('HomeCtrl', function ($scope, $state, $http, Transaction) {

	$scope.transactions = [];
	$scope.transaction = {};

	$scope.load = function(){
		Transaction.query().$promise.then(function(result){
			$scope.transactions = result.list;
		});
	}

	$scope.load();

	$scope.reset = function(){
		$scope.transaction = {};
	}

	$scope.edit = function(transaction){
		$scope.transaction = transaction;
		
	}

	$scope.save = function(transaction){
		if(transaction._id){
			Transaction.update({_id: transaction._id}, transaction).$promise.then(function(){
				$scope.load();
			})
		} else {
			Transaction.create(transaction).$promise.then(function(){
				$scope.load();
			});
		}
		$scope.transaction = {};
	}

	$scope.delete = function(transaction){
		Transaction.delete({_id: transaction._id}, transaction).$promise.then(function(){
			$scope.load();
		})
	}



});