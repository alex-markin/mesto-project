// класс для создания карточки

export class Card {
  constructor({
    item,
    profile,
    selector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  }) {
    this._item = item;
    this._profile = profile;
    this._selector = selector;

    // колбэк функции
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
  }

  // получение шаблона карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".gallery-element")
      .cloneNode(true);

    return cardTemplate;
  }

  // формирование карточки
  generateCard() {
    this._element = this._getTemplate();

    this.cardElementTitle = this._element.querySelector(
      ".gallery-element__title"
    );
    this.cardElementImage = this._element.querySelector(
      ".gallery-element__picture"
    );

    this._deleteButton = this._element.querySelector(".gallery-element__trash");
    this._likeButton = this._element.querySelector(
      ".gallery-element__like-button"
    );
    this._likeCount = this._element.querySelector(
      ".gallery-element__like-count"
    );
    this._image = this._element.querySelector(".gallery-element__picture");

    // проверка на принадлежность карточки пользователю и добавление кнопки удаления
    if (this._item.owner._id === this._profile._id) {
      this._deleteButton.classList.add("gallery-element__trash_visible");
    }

    // проверка на лайк пользователя и добавление активного лайка
    if (this._item.likes.some((like) => like._id === this._profile._id)) {
      this._likeButton.classList.add("gallery-element__like-button_active");
      this._isLiked = true;
    }

    // установка данных карточки
    this.cardElementTitle.textContent = this._item.name;
    this.cardElementImage.src = this._item.link;
    this.cardElementImage.alt = `Картинка: ${this._item.name}`;
    this._likeCount.textContent = this._item.likes.length;

    this._setEventListeners();

    return this._element;
  }

  // установка слушателей
  _setEventListeners() {
    // обработчик удаления карточки
    this._deleteButton.addEventListener("click", this.handleDeleteClick);

    // обработчик лайка/дизлайка
    this._likeButton.addEventListener("click", this.handleLikeClick);

    // обработчик открытия картинки
    this._image.addEventListener("click", this.handleCardClick);
  }

  // функция удаления карточки
  deleteCard() {
    this._element.remove();
  }

  // функция постановки лайка/дизлайка
  setLikes(evt) {
    if (evt.target.classList.contains("gallery-element__like-button_active")) {
      evt.target.classList.remove("gallery-element__like-button_active");
      this._isLiked = false;
    } else {
      evt.target.classList.add("gallery-element__like-button_active");
      this._isLiked = true;
    }
  }
}
