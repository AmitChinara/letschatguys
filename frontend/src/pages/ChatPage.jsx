import { useEffect, useState } from "react";
import socket from "../socket";
import { useUser } from "../context/UserContext";

function ChatPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [hasJoined, setHasJoined] = useState(false);
    const { chatName, setChatName } = useUser();

    useEffect(() => {
        socket.on("chatHistory", (msgs) => setMessages(msgs));
        socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
        socket.on("sessionExpired", () => {
            alert("Session expired — all users left.");
            setMessages([]);
        });

        return () => {
            socket.off("message");
            socket.off("chatHistory");
            socket.off("sessionExpired");
        };
    }, []);

    const joinChat = () => {
        if (chatName) {
            socket.emit("join", chatName);
            setHasJoined(true);
        }
    };

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit("message", input);
            setInput("");
        }
    };

    if (!hasJoined) {
        return (
            <div className="join-container">
                <input placeholder="Your Chat Name" value={chatName} onChange={(e) => setChatName(e.target.value)} />
                <button onClick={joinChat}>Join Chat</button>
            </div>
        );
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, i) => (
                    <div key={i}><strong>{msg.user}</strong>: {msg.text}</div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    placeholder="Type message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;
