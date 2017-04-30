app.controller('userController',function($scope,userService,$location,$rootScope,$cookieStore,$window,$http){
	
	$scope.registerUser = function(){
		userService.registerUser($scope.user)
		       .then(function(resp){
		    	   
		    	  $scope.message = "Registration sucessfully"
		    	  console.log(resp.data);
		    	  $location.path('/login');
		    	  $window.location.reload();
		       },function(resp){
		    	   
		    	   $scope.message = resp.data.message;
		    	   console.log(resp.status);
		    	   $location.path('/login');
		       });
	}
	
	$scope.login = function(){
		 userService.login($scope.user)
		       .then(function(resp){
		    	   
		    	  
		    	   $rootScope.currentUser = resp.data; 
		    	   $cookieStore.put("currentUser",resp.data);
		    	   console.log(resp.status);
		    	   $location.path('/home');
		    	   $window.location.reload();
		       },function(resp){
		    	   
		    	   $scope.message = resp.data.message;
		    	   console.log(resp.status);
		    	   $location.path('/login');
		       });
	}
	


	
//	loginAndRegister form 
	    $('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		  $scope.uploadFile = function(){
              var file = $scope.myFile;
              
              console.log('file is ' );
              console.dir(file);
              
              var uploadUrl = "http://localhost:8081/project2_backend/doUpload";
              userService.uploadFileToUrl(file, uploadUrl)
              .success(function(){
              	$window.location.reload();
              })
              .error(function(){
              });;
           };
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           var model = $parse(attrs.fileModel);
           var modelSetter = model.assign;
           
           element.bind('change', function(){
              scope.$apply(function(){
                 modelSetter(scope, element[0].files[0]);
              });
           });
        }
     };
  }]);