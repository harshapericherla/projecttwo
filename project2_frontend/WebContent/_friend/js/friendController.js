app.controller('friendController',function($scope,$location,friendService,$window){
	  
	$scope.friendRequest = function(username){
		friendService.sendFriendRequest(username)
		           .then(function(resp){
		        	   if(status=='A')
		        	   alert('friend reqeust has been sent to '+username);
		        	   else{
		        		   alert('friend reqeust has been decline to '+username)
		        	   }
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
	
	$scope.updatePendingRequests = function(from,status){
		   console.log(from+''+status);
		   friendService.updatePendingRequests(from,status)
		       .then(function(resp){
		    	   $location.path('/pendingrequests');
		    	   $window.location.reload();
		       },function(resp){
		    	   console.log(resp.status);
		       });
	}
	
   friendService.getAllFriends()
        
	          .then(function(resp){
	        	  $scope.friendslist = resp.data;
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