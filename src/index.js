import "./pages/index.css";
export { avatarImg, renderLoading };

// переменные

const addPopup = document.querySelector("#add-item-popup");
const avatarPopup = document.querySelector("#edit-avatar-popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");

const profileForm = document.forms["edit-profile"];

const cardForm = document.forms["add-place"];
const newCardLink = cardForm.elements.link;
const newCardTitle = cardForm.elements.title;

const editAvatar = document.querySelector(".profile__avatar-container");
const avatarForm = document.forms["edit-avatar"];
const avatarLink = avatarForm.elements.avatarLink;
const avatarImg = document.querySelector(".profile__avatar");

// обновление аватара при рестарте

import { getInfo } from "./components/api.js";
getInfo();

// загрузка базового набор карточек c сервера

import { getCards } from "./components/api.js";
getCards();

// открытие и закрытие модальных окон

import { openPopup, closePopup, editButtonHandle, renderLoading } from "./components/utils.js";

editButton.addEventListener("click", editButtonHandle);

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

editAvatar.addEventListener("click", () => {
  openPopup(avatarPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

// редактирование профиля

import { changeProfile } from "./components/utils.js";
import { profileNameInput, profileStatusInput } from "./components/utils.js";

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  const profileName = profileNameInput.value;
  const profileStatus = profileStatusInput.value;
  const popup = evt.target.closest(".popup");
  changeProfile(profileName, profileStatus);
  closePopup(popup);
  renderLoading(evt.submitter, false);

});

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
import { sendNewCard } from "./components/api.js";

cardForm.addEventListener("submit", (evt) => {
  renderLoading(evt.submitter, true);
  addElement(newCardLink.value, newCardTitle.value);
  sendNewCard(newCardTitle.value, newCardLink.value);
  evt.target.reset();
  setTimeout()
  closePopup();
  renderLoading(evt.submitter, false);
});

// редактирование Аватара

import { updateAvatar } from "./components/api.js";

avatarForm.addEventListener("submit", (evt) => {
  renderLoading(evt.submitter, true);
  evt.preventDefault();
  avatarImg.src = avatarLink.value;
  updateAvatar(avatarLink.value);
  evt.target.reset();
  closePopup();
  renderLoading(evt.submitter, false);
});



