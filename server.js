const path = require('path');
const http = require('http');
require('dotenv').config()
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'BOT';

app.use(express.static(path.join(__dirname, 'public')));
io.on('connection', socket => {
    console.log('new User Connection....', process.env.PORT);

    socket.emit('message', formatMessage(botName, 'Welcome to realtime chat application'));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, "New User join chat"));

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, "A user has been left"));
    })

    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('user', msg));
    });
});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));