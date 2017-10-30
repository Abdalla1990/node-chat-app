const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const socketIo = require('socket.io');
const http = require('http');
var server = http.createServer(app);
const io = socketIo(server);
const Message = require('./utils/message');
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected ');



    socket.emit('newMessage', Message.generateMessage('admin', 'welcome to the chat app'));

    socket.broadcast.emit('newMessage', Message.generateMessage('admin', 'new user joined'));




    socket.on('disconnect', () => {
        console.log('A User left the chat');
        io.emit('newMessage', Message.generateMessage('admin', 'a user has left the chat '));
    });



    socket.on('createMessage', (data, callback) => {
        console.log(data);

        try {
            if (data.text) { io.emit('newMessage', Message.generateMessage(data.from, data.text)); } else { throw new Error('text is not found') }
            callback('Worked!');
        } catch (e) { callback(`error ${e.message}`) }


    });
    socket.on('createLocation', (data, callback) => {
        console.log(data);

        try {
            if (data.location) {
                io.emit('newLocationMessage', Message.generateLocationMessage(data.from, data.location.latitude, data.location.longitude));
            } else { throw new Error('location is not found') }
            callback('Worked!');
        } catch (e) { callback(`error ${e.message}`) }


    })


});




server.listen(port, () => {
    console.log('server is running on port number : ' + port);
})