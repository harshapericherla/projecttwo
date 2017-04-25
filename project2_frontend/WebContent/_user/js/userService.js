app.factory('userService',function($http){
	
	var fac = {};
	var base_url = 'http://localhost:8081/project2_backend';
	
	fac.registerUser = function(user){
		  return $http.post(base_url+'/register',user);
	}
	
	fac.login = function(user){
		  return $http.post(base_url+'/login',user);
	}
	
	fac.logout = function(){
		  return $http.put(base_url+'/logout');
	}
	
	fac.getUser = function(){
		  return $http.get(base_url+'/getuser');
	}
	fac.updateUser = function(user){
		  return $http.put(base_url+'/updateuser',user); 
	}
	return fac;
});