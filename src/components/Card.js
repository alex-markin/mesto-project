// класс для создания карточки

export class Card {
  constructor({ item, profile, selector, api, handleCardClick }) {
    this._item = item;
    this._profile = profile;
    this._selector = selector;
    this._api = api;
    this.handleCardClick = handleCardClick;
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
    if (this._item.owner._id == this._profile._id) {
      this._deleteButton.classList.add("gallery-element__trash_visible");
    }

    // проверка на лайк пользователя и добавление активного лайка
    if (this._item.likes.some((like) => like._id == this._profile._id)) {
      this._likeButton.classList.add("gallery-element__like-button_active");
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
    this._deleteButton.addEventListener("click", async () => {
      this._handleDeleteClick();
    });

    this._likeButton.addEventListener("click", async (evt) => {
      this._handleLikeClick(evt);
    });

    this._image.addEventListener("click", () => {
      this.handleCardClick();
    });
  }

  // слушатель удаления карточки
  async _handleDeleteClick() {
    try {
      await this._api.deleteCard(this._item._id);
      this._element.remove();
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  // слушатель лайка/дизлайка
  async _handleLikeClick(evt) {
    if (evt.target.classList.contains("gallery-element__like-button_active")) {
      try {
        const likeCount = await this._api.unlike(this._item._id);
        this._likeCount.textContent = likeCount.likes.length;
        evt.target.classList.remove("gallery-element__like-button_active");
      } catch {
        console.log(`Ошибка ${err}`);
      }
    } else {
      try {
        const likeCount = await this._api.like(this._item._id);
        this._likeCount.textContent = likeCount.likes.length;
        evt.target.classList.add("gallery-element__like-button_active");
      } catch {
        console.log(`Ошибка ${err}`);
      }
    }
  }
}
