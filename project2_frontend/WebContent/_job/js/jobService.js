app.factory('jobService',function($http){
	  
	  var fac = {};
	  var base_url = 'http://localhost:8081/project2_backend';
	  
	  fac.saveJob = function(job){
		  return $http.post(base_url+'/savejob',job);
	  }  
	  
	  fac.getAllJobs = function(){
		  return $http.get(base_url+'/getAllJobs');
	  }
	  
	  fac.getJobDetail = function(id){
		  return $http.get(base_url+'/getJob/'+id);
	  }
	  return fac;
});