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
	})
	.when('/profilepic',{
		templateUrl: '_user/pages/profilepic.html'
	})
	.when('/edituser',{
		templateUrl: '_user/pages/edituserform.html',
		controller:'editController'
	})
	.when('/addjob',{
		templateUrl: '_job/pages/jobform.html',
		controller:'jobController'
	})
	.when('/getalljobs',{
		templateUrl: '_job/pages/getjobtitle.html',
		controller:'jobController'
	})
	.when('/addpost',{
		templateUrl: '_blog/pages/blogForm.html',
		controller:'blogController'
	});

});

app.run(function($rootScope,$cookieStore,userService,$location){
	
	 if($rootScope.currentUser == undefined){
		   $rootScope.currentUser = $cookieStore.get("currentUser");
	 }
	 
	 $rootScope.logout = function(){
		 
		   delete $rootScope.currentUser;
		   $cookieStore.remove("currentUser");
		   console.log("inside logout");
		   
		   userService.logout()
		         .then(function(resp){
		        	 
		        	 console.log(resp.data);
		        	 $rootScope.message = "logged out sucessfully";
		        	 $location.path('/login');
		        	 
		        	 console.log($rootScope.message);
		         },function(resp){
		        	 console.log(resp.data);
		         });
	 }
});