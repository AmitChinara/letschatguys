import { useEffect, useState } from "react";
import socket from "./socket";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { UserProvider } from "./context/UserContext";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [socketReady, setSocketReady] = useState(false);

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Connected to server");
            setSocketReady(true);
        });

        socket.on("connect_error", (err) => {
            console.log("Socket connect error", err);
            setSocketReady(false);
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
        };
    }, []);

    if (!socketReady) {
        return <div style={{ textAlign: "center", marginTop: "30vh" }}>🔄 Connecting to server...</div>;
    }

    return (
        <UserProvider>
            {isLoggedIn ? <ChatPage /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
        </UserProvider>
    );
}

export default App;
