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
    console.log('connection is initialized');

    socket.on('disconnect', () => {
        console.log('disconnected from server');
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