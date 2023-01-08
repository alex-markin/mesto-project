import "./pages/index.css";

// переменные

const addPopup = document.querySelector("#add-item-popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["add-place"];

const newCardLink = document.querySelector("#link");
const newCardTitle = document.querySelector("#title");

import { profileNameInput, profileStatusInput } from "./components/utils.js";
import { gallery } from "./components/createCards.js";

// функция создания новых карточек (возвращает готовую карточку с функциями открытия и удаления)

import { createCard } from "./components/createCards.js";

// базовый набор карточек

import { initialCards } from "./components/initialCards.js";

// вставка 6 базовых картинок

initialCards.forEach((item) => {
  const galleryElement = createCard(item);
  gallery.append(galleryElement);
});

// функционал открытия и закрытия модальных окон

import {
  openPopup,
  closePopup,
  editButtonHandler,
} from "./components/utils.js";

editButton.addEventListener("click", editButtonHandler);

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// // функционал редактирования профиля

import { changeProfile } from "./components/utils.js";

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const profileName = profileNameInput.value;
  const profileStatus = profileStatusInput.value;
  const popup = evt.target.closest(".popup");

  changeProfile(profileName, profileStatus);
  closePopup(popup);
});

// функционал лайка карточек

import { like } from "./components/utils.js";

document.addEventListener("click", like);

// функционал закрытия попапа по нажатию Escape или кликом на оверлей

import {
  closePopupByEsc,
  closePopupByOverlayClick,
} from "./components/utils.js";

document.addEventListener("keydown", closePopupByEsc);
document.addEventListener("click", closePopupByOverlayClick);

// валидация форм

import { enableValidation } from "./components/validation.js";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-item_error",
  errorClass: "popup__error_hidden",
});

// //функционал добавления новых карточек

import { addElement } from "./components/createCards.js";

cardForm.addEventListener("submit", (evt) => {
  addElement(newCardLink.value, newCardTitle.value);
  evt.target.reset();
  closePopup();
});
