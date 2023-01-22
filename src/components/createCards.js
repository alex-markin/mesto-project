import { openPopup } from "./utils.js"; // повторяющиеся функции

import { deleteCard, like, unlike } from "./api.js"; // работа с API

import { imagePopup, popupImg, popupCaption, gallery, userID } from "./globalConsts.js"; // глобальные переменные

export { createCard, addElement };

// создание новой карточки

function createCard(item, profile) {
  const galleryTemplate = document.querySelector("#gallery-element").content;
  const cardElement = galleryTemplate
    .querySelector(".gallery-element")
    .cloneNode(true);

  const cardElementTitle = cardElement.querySelector(".gallery-element__title");
  const cardElementImage = cardElement.querySelector(
    ".gallery-element__picture"
  );

  const deleteButton = cardElement.querySelector(".gallery-element__trash");
  const likeButton = cardElement.querySelector(".gallery-element__like-button");
  const likeCount = cardElement.querySelector(".gallery-element__like-count");


  cardElementTitle.textContent = item.name;
  cardElementImage.src = item.link;
  cardElementImage.alt = `Картинка: ${item.name}`;
  likeCount.textContent = item.likes.length;


  // добавление кнопки удаления на карточки пользователя

  if (item.owner._id == profile._id) {
    deleteButton.classList.add("gallery-element__trash_visible");
  }

  //открытие картинок в отдельном модальном окне
  cardElementImage.addEventListener("click", (evt) => {
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = cardElementTitle.textContent;
    openPopup(imagePopup);
  });

  //удаление карточек

  deleteButton.addEventListener("click", async () => {
    try {
      await deleteCard(item._id);
      cardElement.remove();
    } catch {
      console.log(`Ошибка ${err}`);
    }
  });

  //лайк карточек

  likeButton.addEventListener("click", async (evt) => {

    if (evt.target.classList.contains("gallery-element__like-button_active")) {

      try {
        await unlike(item._id).then((data) => {
          likeCount.textContent = data.likes.length;
        });
        evt.target.classList.remove("gallery-element__like-button_active");
      } catch {
        console.log(`Ошибка ${err}`);
      }

    } else {

      try {
        await like(item._id).then((data) => {
          likeCount.textContent = data.likes.length;
        });
        evt.target.classList.add("gallery-element__like-button_active");
      } catch {
        console.log(`Ошибка ${err}`);
      }

    }
  });

  return cardElement;
}


// добавление элемента в верстку через окно добавления карточки

function addElement(cardInfo) {
  const item = cardInfo;

  const profile = {
    _id: userID
  }

  const galleryElement = createCard(item, profile);
  gallery.prepend(galleryElement);
}

