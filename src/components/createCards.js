import { openPopup } from "./utils.js"; // повторяющиеся функции

import { deleteCard, like, unlike } from "./api.js"; // работа с API

import { imagePopup, popupImg, popupCaption, gallery } from "./globalConsts.js"; // глобальные переменные

export { createCard, addElement };

// создание новой карточки

function createCard(item) {
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



  //открытие картинок в отдельном модальном окне
  cardElementImage.addEventListener("click", (evt) => {
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = cardElementTitle.textContent;
    openPopup(imagePopup);
  });

  //удаление карточек

  deleteButton.addEventListener("click", () => {
    try {
      deleteCard(item._id);
      cardElement.remove();
    } catch {
      console.log(`Ошибка ${err}`);
    }
  });

  //лайк карточек

  likeButton.addEventListener("click", (evt) => {

      if (evt.target.classList.contains("gallery-element__like-button_active")) {
        evt.target.classList.toggle("gallery-element__like-button_active");

        unlike(item._id).then((data) => {
          likeCount.textContent = data.likes.length;
        })
      } else {
        evt.target.classList.toggle("gallery-element__like-button_active");

        like(item._id).then((data) => {
          likeCount.textContent = data.likes.length;
        })
      }



  });

  return cardElement;
}

// добавление элемента в верстку через окно добавления карточки

function addElement(elementSrc, elementTitle) {
  const item = {
    link: elementSrc,
    name: elementTitle,
    likes: [],
  };

  const galleryElement = createCard(item);
  const deleteButton = galleryElement.querySelector(".gallery-element__trash");

  deleteButton.classList.add("gallery-element__trash_visible");
  gallery.prepend(galleryElement);
}

// для ревьюера: тут элемент кнопки удаления добавляется таким образом, так как очевидно, что пользователь добавляет карточку, следовательно кнопка должна на этой карточке присутствовать. Иначе кнопка подгружается только после перезагрузки страницы. Функция проверки по id добавлена в index при обновлении карточек с сервера.
