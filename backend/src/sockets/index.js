const { Server } = require('socket.io');

let activeUsers = new Set();
let messages = [];

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`🟢 Connected: ${socket.id}`);

        socket.on('join', (chatName) => {
            socket.username = chatName;
            activeUsers.add(socket.id);

            // Send current session messages
            socket.emit('chatHistory', messages);

            io.emit('userJoined', `${chatName} joined the chat`);
        });

        socket.on('message', (msg) => {
            const messageData = { user: socket.username, text: msg };
            messages.push(messageData);
            io.emit('message', messageData);
        });

        socket.on('disconnect', () => {
            activeUsers.delete(socket.id);
            io.emit('userLeft', `${socket.username} left the chat`);
            console.log(`🔴 Disconnected: ${socket.username}`);

            if (activeUsers.size === 0) {
                console.log('💤 All users left. Session expired.');
                messages = [];
                io.emit('sessionExpired');
            }
        });
    });
}

module.exports = { setupSocket };
