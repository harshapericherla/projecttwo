app.controller('editController',function($scope,$location,userService){
	$scope.user = userService.getUser()
	              .then(function(resp){
	            	  $scope.user = resp.data;
	            	  console.log(resp.data);
	              },function(resp){
	            	  
	            	  console.log(resp.status);
	            	  $location.path('/login');
	              });
	
	$scope.updateUser = function(){
		 userService.updateUser($scope.user)
				 .then(function(resp){
					 console.log('updated successfully'+resp.status);
					 $location.path('/home');
				 },function(resp){
					 
					 console.log(resp.status);
					 $location.path('/edituser');
				 });
	}
});