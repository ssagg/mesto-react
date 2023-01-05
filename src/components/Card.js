function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        aria-label="Удалить"
        className="card__delete"
        type="button"
      ></button>
      <div className="card__text">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__icon-box">
          <button
            aria-label="Лайк"
            className="card__icon"
            type="button"
          ></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}
export default Card;
