// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://letschatguys-backend.onrender.com", {
    autoConnect: false,
});

export default socket;
