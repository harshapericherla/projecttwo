app.controller('editController',function($scope){
	   $scope.editPerson = function(id){
		   personFactroy.getPersonById(id,function(resp){
			      $scope.persons = resp.data;
			      console.log($scope.persons);
		   });  
	   };
});