const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const socketIo = require('socket.io');
const http = require('http');
var server = http.createServer(app);
const io = socketIo(server);
const { generateMessage } = require('./utils/message');
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected ');



    socket.emit('newMessage', generateMessage('admin', 'welcome to the caht app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));




    socket.on('disconnect', () => {
        console.log('A User left the chat');
        io.emit('newMessage', generateMessage('admin', 'a user has left the chat '));
    });



    socket.on('createMessage', (data, callback) => {
        console.log(data);

        try {
            if (data.text) { io.emit('newMessage', generateMessage(data.from, data.text)); } else { throw new Error('text is not found') }
            callback('Worked!');
        } catch (e) { callback(`error ${e.message}`) }


    })


});




server.listen(port, () => {
    console.log('server is running on port number : ' + port);
})