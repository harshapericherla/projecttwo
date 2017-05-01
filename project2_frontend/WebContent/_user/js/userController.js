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
		
  //jquery for fileupload
		
		 $(document).on('click', '#close-preview', function(){ 
			    $('.image-preview').popover('hide');
			    // Hover befor close the preview
			    $('.image-preview').hover(
			        function () {
			           $('.image-preview').popover('show');
			        }, 
			         function () {
			           $('.image-preview').popover('hide');
			        }
			    );    
			});

			$(document).ready(function() {
			    // Create the close button
			    var closebtn = $('<button/>', {
			        type:"button",
			        text: 'x',
			        id: 'close-preview',
			        style: 'font-size: initial;',
			    });
			    closebtn.attr("class","close pull-right");
			    // Set the popover default content
			    $('.image-preview').popover({
			        trigger:'manual',
			        html:true,
			        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
			        content: "There's no image",
			        placement:'bottom'
			    });
			    // Clear event
			    $('.image-preview-clear').click(function(){
			        $('.image-preview').attr("data-content","").popover('hide');
			        $('.image-preview-filename').val("");
			        $('.image-preview-clear').hide();
			        $('.image-preview-input input:file').val("");
			        $(".image-preview-input-title").text("BROWSE"); 
			    }); 
			    // Create the preview image
			    $(".image-preview-input input:file").change(function (){     
			        var img = $('<img/>', {
			            id: 'dynamic',
			            width:250,
			            height:200
			        });      
			        var file = this.files[0];
			        var reader = new FileReader();
			        // Set preview image into the popover data-content
			        reader.onload = function (e) {
			            $(".image-preview-input-title").text("CHANGE");
			            $(".image-preview-clear").show();
			            $(".image-preview-filename").val(file.name);            
			            img.attr('src', e.target.result);
			            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
			        }        
			        reader.readAsDataURL(file);
			        $('span').removeClass('hide');
			        $('.before').addClass('hide').parent().removeClass('btn-danger disabled').addClass('btn-success');
			        $('.btn.btn-success').animate({padding:'2%'});
			        
			    });  
			    
			   
			});
		 
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