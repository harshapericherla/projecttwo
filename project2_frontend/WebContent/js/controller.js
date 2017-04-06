app.controller('MainCtrl',function($scope,personService){
	
	$scope.person = personService.test;
	
	$scope.persons = personService.getAllPersons()
	                 .then(function(response){
	                	 console.log(response.status);
	                	  $scope.data = response.data 
	                	  
	                 },function(response){
	                	console.log(response.status);
	                 });
	                 
});