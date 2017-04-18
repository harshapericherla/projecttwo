app.controller('userController',function($scope,userService,$location){
	
	$scope.registerUser = function(){
		userService.registerUser($scope.user)
		       .then(function(resp){
		    	   
		    	  $scope.message = "Registration sucessfully"
		    	  console.log(resp.data);
		    	  $location.path('/login');
		       },function(resp){
		    	   
		    	   $scope.message = resp.data.message;
		    	   console.log(resp.status);
		    	   $location.path('/register');
		       });
	}
	
	$scope.login = function(){
		 userService.login($scope.user)
		       .then(function(resp){
		    	   
		    	   console.log(resp.status);
		    	   $location.path('/home');
		       },function(resp){
		    	   
		    	   console.log(resp.status);
		    	   $location.path('/login');
		       });
	}
});