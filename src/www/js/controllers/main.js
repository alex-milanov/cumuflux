'use strict'

app.controller('MainCtrl', function ($scope, $state, $http, Auth) {

	$scope.$state = $state;

	$scope.userData = Auth.getUserData();

	$scope.menuItems = {
		left: [],
		right: []
	}

	$scope.loggedIn = function(){
		return Auth.loggedIn();
	}

	$scope.login = function(user){
		Auth.login(user).then(function(){
			$state.go("admin");
			$scope.userData = Auth.getUserData();
		});
	}

	$scope.register = function(user){
		Auth.register(user).then(function(){
			$state.go("home");
		});
	}

	$scope.logout = function(){
		Auth.logout().then(function(){
			$state.go("home");
			$scope.userData = Auth.getUserData();
		});
	}

	$scope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){ 
				event.preventDefault(); 

				if(!Auth.isAuthorised(toState)){
					$state.go("home");
				}
		});


	$scope.callFunction = function (name){
		if(typeof name === "string" && name!=""){
        	angular.isFunction($scope[name])
        	$scope[name]()
        }
    }

    $http.get("/api/menu").then(function(menuItems){
		$scope.menuItems = menuItems.data;
		console.log(menuItems.data)
	})
	

});