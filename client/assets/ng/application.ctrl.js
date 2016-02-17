angular.module('app')
	.controller('ApplicationCtrl', function($scope) {
		$scope.$on('login', function(__, user) {
			$scope.currentUser = user;
		});
	});
