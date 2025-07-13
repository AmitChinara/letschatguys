import { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });
            if (res.data.success) {
                onLogin();
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Let’s Chat Guys</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
