app.controller('chatController',function($rootScope,$scope,chatService,userService,$interval,friendService){
	 $scope.chats = [];
	 $scope.stompClient = chatService.stompClient;
	var currentUser = $rootScope.currentUser.username;
	 
	function allFriends(){
		if($rootScope.condition == 'true'){
				friendService.getAllFriends().then(function(resp){
					$scope.data = resp.data;
					checkOnline();
				},function(){});
		}
	};
	function checkOnline(){
		friendService.getAll().then(function(resp){
			var maindata = [];
			var data = $scope.data;
			var data2 = resp.data;
			console.log(data);
			console.log(data2);
			for(i=0;i<data.length;i++){
				for(j=0;j<data2.length;j++){
					if( (data[i].from == data2[j].username || data[i].to == data2[j].username) && data2[j].online == 1){
					    if(data2[j].username != currentUser){
						
					    	maindata.push(data2[j].username);
						     break;
					    }
					}
				}
			}
			$scope.users = maindata;
			console.log($scope.users);
		},function(resp){});
	}
	
	$interval(allFriends,1000);
	 $scope.$on('sockConnected',function(event,frame){
		console.log('sockconnected');
		$scope.username = $rootScope.currentUser.username;
		$scope.stompClient.subscribe("/topic/join",function(message){
			user = JSON.parse(message.body);
			console.log(user);
			
			if(user!= $scope.userName && $.inArray(user,$scope.users) == -1){
				$scope.addUser(user);
				$scope.latestUser = user;
				$scope.$apply();
				$('#joinedChat').fadeIn(100).delay(2000).fadeOut(200);
			}
		});
		
		$scope.stompClient.subscribe('/app/join',function(message){
			$scope.users = JSON.parse(message.body);
			$scope.$apply();
		});
	 });
	 
	 $scope.sendMessage = function(chat){
		 chat.from = $scope.userName;
		 
		 $scope.stompClient.send('/app/chat',{},JSON.stringify(chat));
		 $rootScope.$broadcast('sendingChat',chat);
		 $scope.chat.message = "";
	 }
	 
	 $scope.capitalize = function(str){
		 return str.charAt(0).toUpperCase() + str.slice(1);
	 }
	 
	 $scope.addUser = function(user){
		 $scope.users.push(user);
		 $scope.$apply();
	 }
	 
	 $scope.$on('sockConnected', function(event, frame) {
	        $scope.userName=$rootScope.currentUser.username;
	  
	        $scope.user=$rootScope.currentUser.username;
	        /**
	        $scope.stompClient.subscribe("/queue/chats" + queueSuffix, function(message) {
	        	alert('QUEUE SUFFIX ' + queueSuffix)
	        	alert(message)
	            $scope.processIncomingMessage(message, false);
	        });
	    */
	        $scope.stompClient.subscribe( "/queue/chats/"+$scope.userName, function(message) {
	        	
	            $scope.processIncomingMessage(message, false);
	        });
	        
	        
	        $scope.stompClient.subscribe("/queue/chats", function(message) {
	        	
	            $scope.processIncomingMessage(message, true);
	        });
	        
	        
	    });

	    $scope.$on('sendingChat', function(event, sentChat) {
	        chat = angular.copy(sentChat);
	        chat.from = 'Me';
	        chat.direction = 'outgoing';
	        $scope.addChat(chat);
	    });

	    $scope.processIncomingMessage = function(message, isBroadcast) {
	        message = JSON.parse(message.body);
	        message.direction = 'incoming';
	        if(message.from != $scope.userName) {
	        	$scope.addChat(message);
	            $scope.$apply(); // since inside subscribe closure
	        }
	    };

	 
	    $scope.addChat = function(chat) {
	        $scope.chats.push(chat);
	    };
	 
});
app.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
});

app.directive('ngfocus', function() {
	  return function(scope, element, attrs) {
		  element.bind('click', function() {
			  $('.' + attrs.ngFocus)[0].focus();
		  });
	  };
});