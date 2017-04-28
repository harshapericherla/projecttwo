app.controller('jobController',function($scope,jobService,$location){
	
	$scope.saveJob = function(){
		jobService.saveJob($scope.job)
				   .then(function(resp){
					   console.log($scope.job);
					   $location.path('/getalljobs');
				   },function(resp){
					   
					    $scope.errormessage = resp.data.message;
					    $location.path('/addjob');
				   });
	}
	
	function getAllJobs(){
		jobService.getAllJobs()
				.then(function(resp){
					  $scope.jobs = resp.data;
				},function(resp){
					  
					  console.log(resp.status);
				});
	}
	
	$scope.jobDetail = function(id){
		 $scope.showJobDetails = true;
		 console.log(id);
		 jobService.getJobDetail(id)
		           .then(function(resp){
		        	    $scope.job = resp.data;
		           },function(resp){
		        	    console.log(resp.status);
		           })
	}
	
	getAllJobs();
});