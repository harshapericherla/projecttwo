app.controller('friendController',function($scope,$location,friendService,$window){
	  
	$scope.friendRequest = function(username){
		friendService.sendFriendRequest(username)
		           .then(function(resp){
		        	   alert('friend reqeust has been sent to '+username);
		        	   $location.path('/getallusers');
		        	   $window.location.reload();
		           },function(resp){})
	}
	
	friendService.pendingRequests()
	           .then(function(resp){
	        	     $scope.pendingLists = resp.data;
	           },function(resp){
	        	     console.log(resp.status);
	           });
	
	function getAllUsers(){
		  friendService.getAllUsers()
                  .then(function(resp){
                	  $scope.usersList = resp.data;
              
                  },function(resp){
                	  console.log(resp.data);
                  });
	  }
	  getAllUsers();
});