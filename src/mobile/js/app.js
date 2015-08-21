"use strict";

var app = angular.module('hybrid', [
	'ionic',
	'ngResource'
])

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
	});
})

app.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {


	$ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
	$ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS


	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: "states/tab/index.html"
	})

	// Each tab has its own nav history stack:

	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'states/tab/dash.html',
				controller: 'DashCtrl'
			}
		}
	})

	.state('tab.chats', {
			url: '/chats',
			views: {
				'tab-chats': {
					templateUrl: 'states/tab/chats.html',
					controller: 'ChatsCtrl'
				}
			}
		})
		.state('tab.chat-detail', {
			url: '/chats/:chatId',
			views: {
				'tab-chats': {
					templateUrl: 'states/tab/chats-detail.html',
					controller: 'ChatDetailCtrl'
				}
			}
		})

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'states/tab/account.html',
				controller: 'AccountCtrl'
			}
		}
	})

	.state('tab.rest', {
		url: '/rest',
		views: {
			'tab-rest': {
				templateUrl: 'states/tab/rest.html',
				controller: 'RestCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});
