import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <UserProvider>
        {isLoggedIn ? <ChatPage /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
      </UserProvider>
  );
}

export default App;
