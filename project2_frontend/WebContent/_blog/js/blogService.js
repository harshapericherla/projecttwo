app.factory('blogService',function($http){
	
	var fac = {};
	var base_url = 'http://localhost:8081/project2_backend';
	
    fac.saveBlogPost = function(blog){
    	return $http.post(base_url+'/saveBlogPost',blog);
    }
    
    fac.getAllBlogs = function(){
    	return $http.get(base_url+'/list');
    }
    
    fac.getBlogPostById = function(id){
    	return $http.get(base_url+'/get/'+id);
    }
	return fac;
	
});