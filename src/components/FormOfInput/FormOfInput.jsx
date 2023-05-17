import React from "react";
import "./FormOfInput.css";
import SendImage from "../../images/send-image.png";
function FormOfInput({
  placeholder,
  onChangeInput,
  onClick,
  value,
  className,
}) {
  return (
    <div className={className}>
      <input
        className={
          className === "input-message-form"
            ? "input-message-form__input"
            : "input-telephone-number"
        }
        placeholder={placeholder}
        onChange={(value) => onChangeInput(value)}
        value={value}
      />
      <button
        className={
          className === "input-message-form"
            ? "input-message-form__button"
            : "submit-telephone-number"
        }
        onClick={onClick}
      >
        <img src={SendImage} alt="" className="input-message-form__icon" />
      </button>
    </div>
  );
}

export default FormOfInput;
