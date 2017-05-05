app.controller('blogDetailController',function($scope,blogService,$location,$routeParams){
	var id = $routeParams.id;
	$scope.blogComment = {body:'',blogPost:{}};
	
	blogService.getBlogPostById(id)
	           .then(function(resp){
	        	   $scope.blogPost = resp.data;
	           },function(resp){});
	
	$scope.addBlogComment = function(){
		$scope.blogComment.blogPost = $scope.blogPost;
		blogService.addBlogComment($scope.blogComment)
		            .then(function(resp){
                           console.log('comment addeed');
                     
                           $scope.blogComment.body='';
                           
                           $location.path('/getblogdetail/'+$scope.blogPost.id);
		            },function(resp){
		            	   console.log(resp.status);
		            });
	}
	
	$scope.getBlogComments = function(blogPostId){
		
		      blogService.getBlogComments(blogPostId)
		               .then(function(resp){
		            	   console.log(resp.data);
		            	   $scope.blogComments = resp.data;
		            	   $scope.showcomments = true;
		               },function(resp){})
	}
	
	$scope.updateApproval = function(){
		      blogService.updateApproval($scope.blogPost)
		                 .then(function(resp){
		                	 $location.path('/getallblogs');
		                 },function(resp){
		                	 console.log(resp.status);
		                 })
	}
});