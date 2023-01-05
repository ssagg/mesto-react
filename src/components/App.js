import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [buttonText, setButtonText] = useState("");

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    setButtonText("Сохранить");
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    setButtonText("Сохранить");
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    setButtonText("Создать");
  }
  function handleCardClick(card) {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      link: card.link,
      name: card.name,
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        name="profile"
        title="Редактировать профиль"
        onClose={closeAllPopups}
        buttonText={buttonText}
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
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="profile-about-error"
            ></span>
          </>
        }
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name="place"
        title="Новое место"
        onClose={closeAllPopups}
        buttonText={buttonText}
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
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="place-link-error"
            ></span>
          </>
        }
      />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        name="avatar"
        title="Обновить аватар"
        onClose={closeAllPopups}
        buttonText={buttonText}
        children={
          <>
            <input
              type="url"
              className="popup__input popup-avatar__input popup__input_type_link"
              placeholder="Ссылка на картинку"
              id="avatar-link"
              name="avatar"
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="avatar-link-error"
            ></span>
          </>
        }
      />
      <Footer />
    </div>
  );
}

export default App;
