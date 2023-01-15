import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="place"
      title="Новое место"
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup-place__input popup__input_type_place"
            placeholder="Название"
            id="place-name"
            name="name"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleName}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="place-name-error"
          ></span>
          <input
            type="url"
            className="popup__input popup-place__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            id="place-link"
            name="link"
            value={link}
            onChange={handleLink}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="place-link-error"
          ></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
