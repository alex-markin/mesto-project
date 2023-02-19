import { openPopup } from "./utils.js"; // повторяющиеся функции

import { imagePopup, popupImg, popupCaption } from "./globalConsts.js"; // глобальные переменные

// класс для создания карточки

export class Card {
  constructor(item, profile, selector, api) {
    this._item = item;
    this._profile = profile;
    this._selector = selector;
    this._api = api;
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

    if (this._item.owner._id == this._profile._id) {
      this._deleteButton.classList.add("gallery-element__trash_visible");
    }

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

    this._image.addEventListener("click", (evt) => {
      this._handleImageClick(evt);
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

  // слушатель открытия картинки в попапе
  _handleImageClick(evt) {
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = this.cardElementTitle.textContent;
    openPopup(imagePopup);
  }
}

//создание новой карточки

// function createCard(item, profile) {
//   const galleryTemplate = document.querySelector("#gallery-element").content;
//   const cardElement = galleryTemplate
//     .querySelector(".gallery-element")
//     .cloneNode(true);

//   const cardElementTitle = cardElement.querySelector(".gallery-element__title");
//   const cardElementImage = cardElement.querySelector(
//     ".gallery-element__picture"
//   );

//   const deleteButton = cardElement.querySelector(".gallery-element__trash");
//   const likeButton = cardElement.querySelector(".gallery-element__like-button");
//   const likeCount = cardElement.querySelector(".gallery-element__like-count");

//   cardElementTitle.textContent = item.name;
//   cardElementImage.src = item.link;
//   cardElementImage.alt = `Картинка: ${item.name}`;
//   likeCount.textContent = item.likes.length;

//   // добавление кнопки удаления на карточки пользователя

//   if (item.owner._id == profile._id) {
//     deleteButton.classList.add("gallery-element__trash_visible");
//   }

//   //открытие картинок в отдельном модальном окне
//   cardElementImage.addEventListener("click", (evt) => {
//     popupImg.src = evt.target.src;
//     popupImg.alt = evt.target.alt;
//     popupCaption.textContent = cardElementTitle.textContent;
//     openPopup(imagePopup);
//   });

//   //удаление карточек

//   deleteButton.addEventListener("click", async () => {
//     try {
//       await deleteCard(item._id);
//       cardElement.remove();
//     } catch {
//       console.log(`Ошибка ${err}`);
//     }
//   });

//   //лайк карточек

//   likeButton.addEventListener("click", async (evt) => {

//     if (evt.target.classList.contains("gallery-element__like-button_active")) {

//       try {
//         await unlike(item._id).then((data) => {
//           likeCount.textContent = data.likes.length;
//         });
//         evt.target.classList.remove("gallery-element__like-button_active");
//       } catch {
//         console.log(`Ошибка ${err}`);
//       }

//     } else {

//       try {
//         await like(item._id).then((data) => {
//           likeCount.textContent = data.likes.length;
//         });
//         evt.target.classList.add("gallery-element__like-button_active");
//       } catch {
//         console.log(`Ошибка ${err}`);
//       }

//     }
//   });

//   return cardElement;
// }

// добавление элемента в верстку через окно добавления карточки

export function addElement(cardInfo, userID) {
  const item = cardInfo;

  const profile = {
    _id: userID,
  };

  const galleryElement = createCard(item, profile);
  gallery.prepend(galleryElement);
}
