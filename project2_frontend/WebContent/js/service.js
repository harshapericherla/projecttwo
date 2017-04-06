app.factory('personService',function($http){
	var person = {};
	
	person.test = "hello";
	person.getAllPersons = function(){
		
		return $http.get('http://localhost:8081/projecttwo_Back/getPersons');
	}
	return person;
});