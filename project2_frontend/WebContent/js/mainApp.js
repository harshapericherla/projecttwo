var app = angular.module('mainApp',['ngRoute']);

app.config(function($routeProvider,$locationProvider){
	

	$routeProvider
	.when('/register',{
		templateUrl: '_user/pages/registerUser.html',
		controller:'userController'
	})
	.when('/login',{
		templateUrl: '_user/pages/login.html',
		controller:'userController'
	});
	
	
	
	
});