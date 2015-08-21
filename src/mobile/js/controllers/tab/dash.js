"use strict";

app.controller('DashCtrl', function($scope, Article) {
	$scope.articles = [];

	Article.query().$promise.then(function(result){
		$scope.articles = result.list;
	})
})
