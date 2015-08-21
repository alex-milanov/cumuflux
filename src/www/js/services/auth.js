"use strict"
	app.factory('Auth', function ($state, $http, $location, $cookieStore, $q) {

		var Auth = {
			loggedIn : function(){
				return $cookieStore.get('loggedIn');
			},
			login: function(user){
				return $http.post("/api/login", user).then(function(response){
					$cookieStore.put('loggedIn', true);
					$cookieStore.put('userData', response.data);
				})
			},
			register: function(user){
				return $http.post("/api/register", user)
			},
			logout: function(){
				return $http.get("/api/logout").then(function(){
					$cookieStore.put('userData', {
						"role": "anon"
					});
					$cookieStore.put('loggedIn', false);
				})
			},
			getUserData: function(){
				var userData = $cookieStore.get('userData');
				if(typeof userData === "undefined"){
					userData = {
						"role": "anon"
					}
				}
				return userData;
			},
			isAuthorised: function(state){
				var deferred = $q.defer();
				var user = $cookieStore.get('userData');

				// if state has access rules
				if(typeof state.access !== "undefined"){
					// if user role cannot access
					if(state.access.indexOf(user.role)<0){
						return false;
					}
				}

				return true;

			}
		}

		return Auth;
	})