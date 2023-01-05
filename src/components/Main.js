import { api } from "../utils/Api.js";
import React, { useState, useEffect } from "react";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(
          cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={onCardClick} />
            );
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [onCardClick]);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-overlay">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="аватар"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            aria-label="Редактировать профиль"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          aria-label="Добавить карточку места"
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">{cards}</section>
    </main>
  );
}

export default Main;
