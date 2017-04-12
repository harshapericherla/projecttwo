app.service('productService',function($http){
	
	this.getAllPersons = function(){
		return $http.get('http://localhost:8081/project2_backend/getPersons');
	}
	
	this.save = function(person){
		return $http.post('http://localhost:8081/project2_backend/addPerson',person);
	}
	
	this.remove = function(id){
		return $http['delete']('http://localhost:8081/project2_backend/deletePerson/'+id);
	} 
	
	this.getById = function(id){
		return $http.get('http://localhost:8081/project2_backend/getPerson/'+id);
	}
	
	this.update = function(person){
		return $http.put('http://localhost:8081/project2_backend/updateperson',person);
	}
});