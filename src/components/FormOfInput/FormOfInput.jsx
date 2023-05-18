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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onClick();
      }}
      className={className}
    >
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
        type="submit"
      >
        <img src={SendImage} alt="" className="input-message-form__icon" />
      </button>
    </form>
  );
}

export default FormOfInput;
