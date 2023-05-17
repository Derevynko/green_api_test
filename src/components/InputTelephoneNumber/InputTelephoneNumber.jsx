import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updataUserInputPhoneNumer,
  onSubmitPhoneNumber,
  onClickBtnNewChat,
} from "../store/PhoneNumberForMessagingSlice";
import FormOfInput from "../FormOfInput/FormOfInput";
import "./InputTelephoneNumber.css";
import UserData from "../UserData/UserData";
import ChatItem from "../ChatItem/ChatItem";

function InputTelephoneNumber() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const idInstance = state.userData.userData.idInstance;
  const apiTokenInstance = state.userData.userData.apiTokenInstance;
  const inputPhoneNumber = state.phoneNumber.userInputPhoneNumer;
  const phoneNumber = state.phoneNumber.userSubmitPhoneNumber;

  const clickBtn = state.phoneNumber.clickedBtnNewChat;
  const addNewChat = () => {
    dispatch(onSubmitPhoneNumber(inputPhoneNumber));
    dispatch(onClickBtnNewChat(false));
  };
  const newChat = () => {
    dispatch(onClickBtnNewChat(true));
  };
  return (
    <div className="user-window">
      <UserData idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      <div className="user-window__create-interlocutor">
        {clickBtn ? (
          <div className="user-window__telephone-number">
            <FormOfInput
              className="user-window__input-telephone-number"
              placeholder="Введите телефон"
              onChangeInput={(inputValue) => {
                dispatch(updataUserInputPhoneNumer(inputValue.target.value));
              }}
              onClick={addNewChat}
            />
          </div>
        ) : (
          <button className="user-window__create-chat" onClick={newChat}>
            Создать чат
          </button>
        )}
      </div>
      <div className="user-window__chats">
        <p>Чаты:</p>
        {phoneNumber === "" ? null : <ChatItem telephoneNumber={phoneNumber} />}
      </div>
    </div>
  );
}
export default InputTelephoneNumber;
