"use strict";

var app = angular.module('hybrid', [
	'ui.router',
	'ngResource',
	'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
	function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url : '/',
				controller: 'HomeCtrl',
				templateUrl: '/states/home.html'
			})
			.state('about', {
				url : '/about',
				templateUrl: '/states/about.html'
			})
			.state('login', {
				url : '/login',
				templateUrl: '/states/login.html'
			})
			.state('admin', {
				url : '/admin',
				templateUrl: '/states/admin/index.html',
				access: ["admin"]
			})
			.state('admin.users', {
				url : '/users',
				controller: 'AdminUsersCtrl',
				templateUrl: '/states/admin/users.html',
				access: ["admin"]
			})
			.state('admin.transactions', {
				url : '/transactions',
				controller: 'AdminTransactionsCtrl',
				templateUrl: '/states/admin/transactions.html',
				access: ["admin"]
			})

		$locationProvider.hashPrefix('!');

	}
]);