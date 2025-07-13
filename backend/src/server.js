const express = require('express');
const http = require('http');
const cors = require('cors');
const { setupSocket } = require('./sockets');

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

// 🔐 Shared credentials
const VALID_USERNAME = 'chatadmin';
const VALID_PASSWORD = 'chatpassword';

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

const server = http.createServer(app);
setupSocket(server);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
