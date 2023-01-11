import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import Card from "./Card.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [buttonText, setButtonText] = useState("");
  const [currentUser, setCurrentUser] = useState([]);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(
          cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                // onCardClick={onCardClick}
                onCardClick={handleCardClick}
                // onCardLike={onCardLike}
                // onCardDelete={onCardDelete}
                onCardDelete={handleDeleteClick}
              />
            );
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(currentUser._id);
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

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      // .then((cards) => {
      //   setCards(cards.filter((c) => (c._id === card._id ? card.remove() : c)));
      // })
      .then(() => {
        setCards((cards) =>
          cards.filter((c) => (c._id === card._id ? c.remove() : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }
  function handleUpdateUser(data) {
    api.sendUserInfo(data).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(data) {
    api.sendAvatar(data).then((avatar) => {
      setCurrentUser(avatar);
      closeAllPopups();
    });
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardContext.Provider value={cards}>
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            // onCardLike={handleCardLike}
            // onCardDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            buttonText={buttonText}
            onUpdateUser={handleUpdateUser}
          />

          {/* <PopupWithForm
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
          /> */}
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
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            buttonText={buttonText}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* <PopupWithForm
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
          /> */}
          <Footer />
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
