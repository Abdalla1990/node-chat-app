var socket = io();

socket.on('connect', function() {
    console.log('connected');


    socket.emit('createMessage', {
        user: "client",
        message: "this is a message"

    })
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});


socket.on('newMessage', function(data) {
    console.log(data);
});