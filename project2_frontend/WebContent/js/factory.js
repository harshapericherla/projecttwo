app.factory('personFactory',function($http){
	var persons = {};
	persons.getPersonObj = function(callback){
	     $http.get('http://localhost:8081/project2_backend/getPersons').
	     then(function(resp){
	    	 
	    	 callback(resp.data);
	     },function(resp){
	    
	     });
	}
	return persons;
});