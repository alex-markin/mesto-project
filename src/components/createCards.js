export {createCard, addElement}; //functions
export {gallery}; //consts
import {openPopup} from './utils.js';

const imagePopup = document.querySelector('#image-popup');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');
const gallery = document.querySelector('.gallery');

function createCard(item) {
  const galleryTemplate = document.querySelector('#gallery-element').content;
  const cardElement = galleryTemplate.querySelector('.gallery-element').cloneNode(true);

  const cardElementTitle = cardElement.querySelector('.gallery-element__title');
  const cardElementImage = cardElement.querySelector('.gallery-element__picture');

  const deleteButton = cardElement.querySelector('.gallery-element__trash');
  const likeButton = cardElement.querySelector('.gallery-element__like-button');

  cardElementTitle.textContent = item.name;
  cardElementImage.src = item.link;
  cardElementImage.alt = `Картинка: ${item.name}`;

  //открытие картинок в отдельном модальном окне
  cardElementImage.addEventListener('click', (evt) => {
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = cardElementTitle.textContent;
    openPopup(imagePopup);
  })

  //удаление карточек

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  //лайк карточек

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("gallery-element__like-button_active");
  });

  return cardElement
}

function addElement(elementSrc, elementTitle) {
  const item = {
    link: elementSrc,
    name: elementTitle
  }
  const galleryElement = createCard(item)
  gallery.prepend(galleryElement);
}
