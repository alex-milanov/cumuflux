"use strict";

app.controller('ChatsCtrl', function($scope, Chat) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
	$scope.chats = Chat.all();
	$scope.remove = function(chat) {
		Chat.remove(chat);
	}
})

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chat) {
	$scope.chat = Chat.get($stateParams.chatId);
})