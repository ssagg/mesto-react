import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
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
            ref={avatarRef}
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
