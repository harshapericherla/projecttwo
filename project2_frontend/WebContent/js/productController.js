app.controller('productController',function($scope,productService){
	console.log('ProductController running');
	
	
	function getAll(){
		        productService.getAllPersons()
	                     .then(function(resp){
	                    	      console.log(resp.status);
	                    	      $scope.persons = resp.data;
	                    	      
	                         },function(resp){
	                        	  console.log(resp.status)
	                         });
	};
	
	$scope.savePerson = function(){
		       productService.save($scope.person)
		                 .then(function(resp){
		                	 console.log(resp.status);
		                	 $scope.status = 'Saved Successfully';
		                	 
		                 },function(resp){
		                	 console.log(resp.status);
		                 });
		                 
	};
	
	$scope.deletePerson = function(id){
		       productService.remove(id)
		                 .then(function(resp){
		                	 console.log(resp.status);
		                	 getAll();
		                 },function(resp){
		                	console.log(resp.status); 
		                 });
	}
	
	getAll();
});