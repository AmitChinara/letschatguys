import { useEffect, useState } from "react";
import socket from "../socket";
import { useUser } from "../context/UserContext";
import "./ChatPage.css";

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
            setHasJoined(false);
        });

        return () => {
            socket.off("message");
            socket.off("chatHistory");
            socket.off("sessionExpired");
        };
    }, []);

    const joinChat = () => {
        if (chatName.trim()) {
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
            <div className="chat-wrapper">
                <div className="join-container">
                    <h2>Enter Chat Name</h2>
                    <input
                        type="text"
                        placeholder="Your Chat Name"
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                    />
                    <button onClick={joinChat}>Join Chat</button>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-wrapper">
            <div className="chat-container">
                <h2 className="chat-title">💬 Let's Chat</h2>
                <div className="chat-box">
                    {messages.map((msg, i) => (
                        <div key={i} className="chat-message">
                            <strong>{msg.user}</strong>: {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-row">
                    <input
                        className="chat-input"
                        placeholder="Type message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="chat-send" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
