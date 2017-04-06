app.controller('myCtrl',function($scope,personFactory){
	$scope.name = 'harsha';
	personFactory.getPersonObj(function(data){
		
		$scope.persons = data;
		console.log($scope.persons);
	});
	                
});