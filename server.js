const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'SocketChat Bot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {


        // Emits to user connecting, welcoming them
        socket.emit('message', formatMessage(botName, 'Welcome to SocketChat!'))

        // Broadcast when a user connects to users other than user
        socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));
    });
    
    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    })
})

const PORT = process.env.PORT || 3000; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));