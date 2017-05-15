app.factory('friendService',function($http){
	   var fac={};
	   var base_url = 'http://localhost:8081/project2_backend';
	   fac.getAllUsers = function(){
		   return $http.get(base_url+"/getallusers");
	   }
	   
	   fac.sendFriendRequest = function(username){
		   return $http.put(base_url+'/friendrequest/'+username);
	   }
	   
	   fac.pendingRequests = function(){
		   return $http.get(base_url+'/pendingrequests');
	   }
	   
	   fac.updatePendingRequests = function(from,status){
		   console.log(from+''+status);
		   return $http.put(base_url+'/updatependingrequests/'+from+'/'+status);
	   }
	   fac.getAllFriends = function(){
		   return $http.get(base_url+'/friendslist');
	   }
	   fac.getAll = function(){
		   return $http.get(base_url+"/getall");
	   }
	   
	   return fac;
});