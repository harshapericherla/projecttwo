var app = angular.module('mainApp',['ngRoute','ngCookies']);

app.config(function($routeProvider,$locationProvider){
	

	$routeProvider
	.when('/register',{
		templateUrl: '_user/pages/registerUser.html',
		controller:'userController'
	})
	.when('/login',{
		templateUrl: '_user/pages/login.html',
		controller:'userController'
	})
	.when('/home',{
		templateUrl: '_home/home.html'
	});

});

app.run(function($rootScope,$cookieStore,userService){
	
	 if($rootScope.currentUser == undefined){
		   $rootScope.currentUser = $cookieStore.get("currentUser");
	 }
	 
	 $rootScope.logout = function(){
		   delete $cookieStore;
		   console.log("inside logout");
		   
		   userService.logout()
		         .then(function(){},function(){});
	 }
});