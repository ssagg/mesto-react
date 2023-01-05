import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
      id="popup-edit"
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className={`popup__button-close popup-${props.name}__button-close`}
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup-${props.name}__form`}
          name={`${props.name}-edit`}
          id={`${props.name}-edit`}
          noValidate
        >
          {props.children}
          <button
            className="popup__button"
            type="submit"
            id={`button-${props.name}`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
