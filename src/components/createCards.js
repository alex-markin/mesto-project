export { createCard, addElement }; //functions
export { gallery }; //consts
import { openPopup } from "./utils.js";
import { deleteCard, like, unlike } from "./api.js";

const imagePopup = document.querySelector("#image-popup");
const popupImg = document.querySelector(".popup__img");
const popupCaption = document.querySelector(".popup__caption");
const gallery = document.querySelector(".gallery");

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
    cardElement.remove();
    deleteCard(item._id);
  });

  //лайк карточек

  likeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("gallery-element__like-button_active")) {
      evt.target.classList.toggle("gallery-element__like-button_active");
      unlike(item._id, cardElement);
    } else {
      evt.target.classList.toggle("gallery-element__like-button_active");
      like(item._id, cardElement);
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
