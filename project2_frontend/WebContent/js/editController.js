app.controller('editController',function($scope,$routeParams,productService){
	
	var id = $routeParams.id;
	console.log(id);
	
	productService.getById(id)
	           .then(function(resp){
	        	  $scope.person = resp.data; 
	           },function(resp){
	        	  console.log(resp.status); 
	           });
	
	$scope.editPerson = function(){
		 productService.update($scope.person)
	         .then(function(resp){
	        	 console.log(resp.status);
	        	 $scope.status = 'Edited Successfully';
	        	 
	         },function(resp){
	        	 console.log(resp.status);
	         });
	}
});