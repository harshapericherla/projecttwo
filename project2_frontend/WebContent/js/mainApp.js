var app = angular.module('mainApp',['ngRoute','ngCookies','ngAnimate']);

app.config(function($routeProvider,$locationProvider){
	

	$routeProvider
	.when('/register',{
		templateUrl: '_user/pages/registerUser.html',
		controller:'userController'
	})
	.when('/login',{
		templateUrl: '_user/pages/loginAndRegister.html',
		controller:'userController'
	})
	.when('/home',{
		templateUrl: '_home/home.html',
		controller:'blogController'
	})
	.when('/profilepic',{
		templateUrl: '_user/pages/profilepic.html',
		controller:'userController'
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
	})
	.when('/getallblogs',{
		templateUrl: '_blog/pages/getblogtitle.html',
		controller:'blogController'
	})
	.when('/getblogdetail/:id',{
		templateUrl: '_blog/pages/getblogdetail.html',
		controller:'blogDetailController'
	})
	.when('/getallusers',{
		templateUrl: '_friend/pages/userslist.html',
		controller:'friendController'
	})
	.when('/pendingrequests',{
		templateUrl: '_friend/pages/pendingrequests.html',
		controller:'friendController'
	})
	.when('/listoffriends',{
		templateUrl: '_friend/pages/friendslist.html',
		controller:'friendController'
	})
	.when('/chat',{
		templateUrl: '_chat/pages/chat.html',
		controller:'chatController'
	})
	.otherwise({
		redirectTo: '/home'
	});

});

app.run(function($rootScope,$cookieStore,userService,$location){
	
	
	$rootScope.condition = 'false';
	 if($rootScope.currentUser == undefined){
		   $rootScope.currentUser = $cookieStore.get("currentUser");
	 }
	 
	 $rootScope.logout = function(){
		 $rootScope.condition = 'false';
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
	 
	 
	 
	 $('li').click(function(){
		  $('li').removeClass('active');
		  $(this).addClass('active');
	 });
});