const { Server } = require('socket.io');

let activeUsers = new Set();
let messages = []; // 🧠 In-memory message store

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`🟢 Connected: ${socket.id}`);

        socket.on('join', (username) => {
            socket.username = username;
            activeUsers.add(socket.id);
            console.log(`👤 ${username} joined`);

            // 🔁 Send current messages to newly joined user
            socket.emit('chatHistory', messages);

            // Notify others
            io.emit('userJoined', `${username} joined the chat`);
        });

        socket.on('message', (msg) => {
            const messageData = { user: socket.username, text: msg };
            messages.push(messageData); // 💾 Save in memory
            io.emit('message', messageData); // Broadcast to all
        });

        socket.on('disconnect', () => {
            activeUsers.delete(socket.id);
            console.log(`🔴 ${socket.username} disconnected`);
            io.emit('userLeft', `${socket.username} left the chat`);

            if (activeUsers.size === 0) {
                console.log('💤 All users disconnected. Clearing session.');
                messages = []; // 🧹 Clear chat history
                io.emit('sessionExpired');
            }
        });
    });
}

module.exports = { setupSocket };
