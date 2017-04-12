app.factory('personFactory',function($http){
	var personfac = {};
	personfac.getPersonObj = function(callback,status){
	     $http.get('http://localhost:8081/project2_backend/getPersons').
	     then(function(resp){
	       callback(resp.data,resp);
	    	 
	     },function(resp){
	         status(resp);
	     });
	};
	
	personfac.savePerson = function(person,callback){
		$http.post('http://localhost:8081/project2_backend/addPerson',person).then(function(resp){
			    console.log(" Save successful ");
			    callback(resp);
			    
			},function(resp){
				callback(resp);
		   });
	};
	
	
	personfac.deletePerson = function(id,callback){
		$http['delete']('http://localhost:8081/project2_backend/deletePerson/'+id).then(function(resp){
			   console.log( "delete successful " );
			   callback(resp);
			   
		},function(resp){
			   console.log(resp.status);
			   callback(resp);
		});
	}
	
	personfac.getPersonById = function(id,callback){
		$http.get('http://localhost:8081/project2_backend/getPerson/'+id).then(function(resp){
			callback(resp.data);
		},function(resp){
			
		});
	}
	
	/*personfac.editPerson = function(person,callback){
		$http.put('http://localhost:8081/project2_backend/updateperson',person).then(function(resp){
			
		},function(resp){
			
		});
	}*/
	
	return personfac;
});