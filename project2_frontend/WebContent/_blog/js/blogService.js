app.factory('blogService',function($http){
	
	var fac = {};
	var base_url = 'http://localhost:8081/project2_backend';
	
    fac.saveBlogPost = function(blog){
    	return $http.post(base_url+'/saveBlogPost',blog);
    }
	return fac;
	
});