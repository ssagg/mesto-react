import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleName(e) {
    console.log(e.target.value);
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="profile"
      title="Редактировать профиль"
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input_type_name"
            placeholder="Ваше имя"
            id="profile-name"
            name="name"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleName}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="profile-name-error"
          ></span>
          <input
            type="text"
            className="popup__input popup__input_type_about"
            placeholder="Род занятий"
            id="profile-about"
            name="about"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescription}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="profile-about-error"
          ></span>
        </>
      }
    />
  );
}
export default EditProfilePopup;
