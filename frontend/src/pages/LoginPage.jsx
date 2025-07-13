import { useState } from "react";
import axios from "axios";
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://letschatguys-backend.onrender.com/login", {
                username,
                password,
            });
            if (res.data.success) {
                onLogin();
            } else {
                alert("❌ Invalid credentials");
            }
        } catch (err) {
            alert("❌ Login failed. Please try again.");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>🗨️ Let’s Chat Guys</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;
