import React from "react";
import "./ChatItem.css";

function ChatItem({ telephoneNumber }) {
  return <div className="chat-item">+{telephoneNumber}</div>;
}
export default ChatItem;
