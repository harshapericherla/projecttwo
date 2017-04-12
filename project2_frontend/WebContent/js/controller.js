app.controller('PersonController',function($scope,personFactory){
	$scope.name = 'harsha';
	
	function getAllPersons(){
		personFactory.getPersonObj(function(data,resp){
			
			$scope.persons = data;
			console.log($scope.persons);
			console.log(resp.status);
			
		},function(resp){
			
			console.log(resp.status);
		});
    };
	$scope.savePerson = function(){
		personFactory.savePerson($scope.person,function(resp){
			console.log(resp.status);
			if(resp.status == 200){
				$scope.status = 'Saved Successfully'
			}
		});
	};
	
	$scope.deletePerson = function(id){
		console.log(id);
		personFactory.deletePerson(id,function(resp){
			console.log(resp.status);
			if(resp.status == 200){
			      getAllPersons();
			}
		});
	}
	
	getAllPersons();
});

