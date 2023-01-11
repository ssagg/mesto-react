import { useState, useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");
  const avatarRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.avatar,
    });
    console.log(avatar);
  }
  function handleAvatar(e) {
    setAvatar(e.target.avatar);
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="avatar"
      title="Обновить аватар"
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="url"
            className="popup__input popup-avatar__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            id="avatar-link"
            name="avatar"
            value={avatar}
            onChange={handleAvatar}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="avatar-link-error"
          ></span>
        </>
      }
    />
  );
}
export default EditAvatarPopup;
