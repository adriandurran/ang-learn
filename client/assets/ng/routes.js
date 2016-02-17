angular.module('app')
	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			controller: 'PostsCtrl',
			templateUrl: 'layout/templates/posts.html'
		})
		.when('/register', {
			controller: 'RegisterCtrl',
			templateUrl: 'layout/templates/register.html'
		})
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: 'layout/templates/login.html'
		})
	});
