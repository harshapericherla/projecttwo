app.factory('chatService',function($rootScope){
	var socket = new SockJS('/project2_backend/portfolio');
    var stompClient = Stomp.over(socket);
    stompClient.connect("harsha", "123", function(frame) {
      $rootScope.$broadcast('sockConnected', frame);
    });

    return {
      stompClient: stompClient
    };
});