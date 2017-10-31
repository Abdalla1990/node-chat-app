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
    var formattedTime = moment(data.createdAt).format('h:mm a')
    var li = jQuery('<li></li>');

    li.text(`${data.from} - ${formattedTime}: ${data.text}`);
    jQuery('#messages').append(li);




});

socket.on('newLocationMessage', function(data) {
    console.log(data);
    var formattedTime = moment(data.createdAt).format('h:mm a')
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blnank">Current Location</a>')
    li.text(`${data.from} - ${formattedTime}: `);
    a.attr('href', data.location)
    li.append(a);
    jQuery('#messages').append(li);





});


var submitButton = jQuery('#send-message');
submitButton.on('click', function(e) {
    e.preventDefault();

    var message = jQuery('[name=message]');
    //console.log('I am working', message);
    socket.emit('createMessage', { from: 'User', text: message.val() }, function(serverM) {
        console.log(`server says : ${serverM}`);
        message.val('');
    });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    e.preventDefault();
    if (!navigator.geolocation) {
        return jQuery('#alert').append('<p>Geolocation not supported by your browser</p>');
    } else {
        locationButton.attr('disabled', 'disabled').text('sending the location ...');
        navigator.geolocation.getCurrentPosition(function(position) {

            console.log(position);
            var location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocation', {
                from: 'User',
                location: location
            }, function(serverM) {
                console.log(serverM)

            });
            // return jQuery('#alert').append('<p>' + position.coords.longitude + position.coords.latitude + '</p>');
        }, function() {
            jQuery('#alert').append('<p>unable to fetch Location</p>');
            locationButton.removeAttr('disabled').text('Send Location');
        });
    }
})