//const { generateMessage } = require('../../server/utils/message');

var socket = io();

socket.on('connect', function() {
    console.log('connected');


});


socket.on('disconnect', function() {
    console.log('disconnected from server');
});


socket.on('newMessage', function(data) {
    console.log(data);
    var li = jQuery('<li></li>');
    li.text(`${data.from} : ${data.text}`);
    jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var message = jQuery('[name=message]').val();
    //console.log('I am working', message);
    socket.emit('createMessage', { from: 'User', text: message }, function(serverM) {
        console.log(`server says : ${serverM}`);
    });

})