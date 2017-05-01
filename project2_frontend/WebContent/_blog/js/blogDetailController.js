app.controller('blogDetailController',function($scope,blogService,$location,$routeParams){
	var id = $routeParams.id;
	
	blogService.getBlogPostById(id)
	           .then(function(resp){
	        	   $scope.blogPost = resp.data;
	           },function(resp){})
});