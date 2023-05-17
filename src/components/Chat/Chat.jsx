import React from "react";
import MessageItem from "../MessageItem/MessageItem";
import axios from "axios";
import "./Chat.css";
import FormOfInput from "../FormOfInput/FormOfInput";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateInputMessage } from "../store/ChatSlice";

function Chat() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const idInstance = state.userData.userData.idInstance;
  const messages = state.chatMessages.chatMessages;
  const apiTokenInstance = state.userData.userData.apiTokenInstance;
  const currentMessage = state.chatMessages.inputMessage;
  const phoneNumberToSendMessage = state.phoneNumber.userSubmitPhoneNumber;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callUpdate(), []);
  function callUpdate() {
    axios
      .get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      )
      .then((res) => {
        if (res.data != null) {
          if (res.data.body.typeWebhook === "incomingMessageReceived") {
            if (
              res.data.body.senderData.chatId ==
              `${phoneNumberToSendMessage}@c.us`
            )
              dispatch(
                addMessage({
                  value: res.data.body.messageData.textMessageData.textMessage,
                  type: "accepted",
                })
              );
            axios
              .delete(
                `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${res.data.receiptId}`
              )
              .then(() => {
                return callUpdate();
              });
          } else if (
            res.data.body.typeWebhook === "outgoingMessageStatus" ||
            "outgoingAPIMessageReceived"
          ) {
            axios
              .delete(
                `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${res.data.receiptId}`
              )
              .then(() => {
                return callUpdate();
              });
          }
        } else return callUpdate();
      });
  }
  const sendMessage = () => {
    const user = {
      chatId: `${phoneNumberToSendMessage}@c.us`,
      message: `${currentMessage}`,
    };
    axios
      .post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        user
      )
      .then(() => {
        dispatch(addMessage({ value: currentMessage, type: "sent" }));
        dispatch(updateInputMessage(""));
      });
  };
  const inputMessage = (value) => {
    dispatch(updateInputMessage(value.target.value));
  };

  return (
    <div className="chat">
      <div className="chat__interlocutor-data">
        <p className="interlocutor-phone-number">{`+ ${phoneNumberToSendMessage}`}</p>
      </div>
      <div className="chat__messages">
        <div className="chat__messages__items">
          <>
            {messages.map((item) => {
              return (
                <MessageItem
                  key={item.value}
                  className={item.type}
                  messageName={item.value}
                ></MessageItem>
              );
            })}
          </>
        </div>
        <div className="chat__input-message">
          <FormOfInput
            className="input-message-form"
            value={currentMessage}
            onClick={sendMessage}
            placeholder="Введите сообщение"
            onChangeInput={inputMessage}
          />
        </div>
      </div>
    </div>
  );
}
export default Chat;
