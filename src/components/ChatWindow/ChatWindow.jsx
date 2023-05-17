import React from "react";
import InputTelephoneNumber from "../InputTelephoneNumber/InputTelephoneNumber";
import Chat from "../Chat/Chat.jsx";
import "./ChatWindow.css";

function ChatWindow() {
  return (
    <div className="chat-window">
      <InputTelephoneNumber />
      <Chat />
    </div>
  );
}
export default ChatWindow;
