const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const socketIo = require('socket.io');
const http = require('http');
var server = http.createServer(app);
const io = socketIo(server);
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected ');



    socket.emit('newMessage', {
        from: 'admin',
        message: 'welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        message: 'new User Joined ',
        createdAt: new Date().getTime()
    });




    socket.on('disconnect', () => {
        console.log('A User left the chat');
    });



    socket.on('createMessage', (data) => {
        console.log(data);

        io.emit('newMessage', {
            user: data.user,
            message: data.message,
            createdAt: new Date().getDate()
        });
    })


});




server.listen(port, () => {
    console.log('server is running on port number : ' + port);
})