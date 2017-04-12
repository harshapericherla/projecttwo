var app = angular.module('mainApp',['ngRoute']);

app.config(function($routeProvider,$locationProvider){
	

	$routeProvider
	.when('/add',{
		templateUrl: 'pages/createPerson.html',
		controller:'productController'
	})
	.when('/list',{
		templateUrl: 'pages/listPerson.html',
		controller:'productController'
	})
	.when('/editPerson/:id',{
		templateUrl: 'pages/editPerson.html',
		controller:'editController'
	});
	
	
	
});