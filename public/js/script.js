var socket = io();

function scrollToBottom() {
    //selectors

    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //hieghts

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var LastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + LastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('connected');


});


socket.on('disconnect', function() {
    console.log('disconnected from server');
});


socket.on('newMessage', function(data) {
    var formattedTime = moment(data.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: data.from,
        createdAt: formattedTime,
        text: data.text
    });

    jQuery('#messages').append(html);

    scrollToBottom();

});

socket.on('newLocationMessage', function(data) {

    var formattedTime = moment(data.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: data.from,
        createdAt: formattedTime,
        location: data.location
    });

    jQuery('#messages').append(html);

    scrollToBottom();



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