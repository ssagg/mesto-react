import { api } from "../utils/Api.js";
import React, { useState, useEffect, useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  // cards,
}) {
  // const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CurrentCardContext);

  // useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((cards) => {
  //       setCards(
  //         cards.map((card) => {
  //           console.log(card);
  //           return (
  //             <Card
  //               card={card}
  //               key={card._id}
  //               onCardClick={onCardClick}
  //               onCardLike={onCardLike}
  //               onCardDelete={onCardDelete}
  //             />
  //           );
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  console.log(cards);
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-overlay">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            aria-label="Редактировать профиль"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
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
