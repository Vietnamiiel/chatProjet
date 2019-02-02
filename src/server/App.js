const express = require('express');
const app = express();

server = app.listen(8080, () => {
    console.log('server is running on port 8080')
});

var socket = require('socket.io');
io = socket(server);

//recoit les données (user+message) et les renvois
io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECEIVE_MESSAGE', data);
    })
});