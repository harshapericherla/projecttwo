var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	
	$routeProvider
	.when('/list',{
		templateUrl:'pages/listPerson.html',
		controller:'PersonController'
	})
	.when('/add',{
		templateUrl:'pages/createPerson.html',
		controller:'PersonController'
	})
	.when('/editPerson/:id',{
		templateUrl:'pages/editPerson.html',
		controller:'editController'
	})
	.otherwise({
		templateUrl:'pages/listPerson.html',
		controller:'PersonController'
	});
}]);