const express = require('express');
const http = require('http');
const cors = require('cors');
const { setupSocket } = require('./sockets');

const app = express();
app.use(cors());

const server = http.createServer(app);
setupSocket(server);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
