"use strict";

app.controller('RestCtrl', function($scope, $http) {

	$scope.rest = {
		uri: "localhost",
		port: "3000",
		path: "/api/articles",
		result: ""
	}

	$scope.get = function(rest){
		$http.get("http://"+rest.uri+":"+rest.port+rest.path,{}).success(function(result){
			console.log(rest,result);
			$scope.rest.result = result;
		}).error(function(error){
			$scope.rest.result = error;
		})
	}

});