import "./pages/index.css"; //  CSS стили

import {
  addPopup,
  avatarPopup,
  editButton,
  addButton,
  closeButtons,
  profileForm,
  cardForm,
  newCardLink,
  newCardTitle,
  editAvatar,
  avatarForm,
  avatarLink,
  avatarImg,
  profileName,
  profileStatus,
  profileNameInput,
  profileStatusInput,
  editPopup,
  userID,
  gallerySelector,
  headers,
  baseURL
} from "./components/globalConsts.js"; // глобальные переменные

import {
  Api
} from "./components/Api.js"; // работа с API

import { Card } from "./components/Card.js"; // класс для создания карточки

import {
  openPopup,
  closePopup,
  renderLoading,
  changeProfile,
} from "./components/utils.js"; // повторяющиеся функции

import { Section } from "./components/Section"; // класс для создания карточек

import { FormValidator } from "./components/FormValidator.js"; // валидация форм



// РЕНДЕРИНГ ПРОФИЛЯ И КАРТОЧЕК

// создание экземпляра класса Api
const api = new Api({
  baseUrl: baseURL,
  headers: headers
});

// рендеринг профиля и карточек с сервера
async function renderInfo() {
  try {
    const info = await api._getInfo();
    // рендер профиля
    avatarImg.src = info[0].avatar;
    profileName.textContent = info[0].name;
    profileStatus.textContent = info[0].about;

    // рендер карточек
    const cardList = new Section({
      data: info[1],
      renderer: (item) => {
        const card = new Card(item, info[0], '#gallery-element', api);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }}, gallerySelector);
      cardList.renderItems();
  } catch {
    console.log(`Ошибка ${err}`);
  }
}

renderInfo()

// обработчик формы добавления новых карточек
cardForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  try {
    const newCard = await api.sendNewCard(newCardTitle.value, newCardLink.value)
    addElement(newCard, userID)
    evt.target.reset()
    closePopup()
  } catch {
    console.log(`Ошибка ${err}`);
  } finally {
    renderLoading(evt.submitter, false);
  }
});

// открытие и закрытие модальных окон

function editButtonHandle() {
  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;
  openPopup(editPopup);
}

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

// обработчик формы редактирования профиля

profileForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  try {
    const profileName = profileNameInput.value;
    const profileStatus = profileStatusInput.value;
    const popup = evt.target.closest(".popup");
    await api.sendProfileChanges(profileName, profileStatus);
    changeProfile(profileName, profileStatus);
    closePopup(popup);
  } catch {
    console.log(`Ошибка ${err}`);
  } finally {
    renderLoading(evt.submitter, false);
  }
});


// обработчик формы редактирования Аватара

avatarForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  try {
    await api.updateAvatar(avatarLink.value);
    avatarImg.src = avatarLink.value;
    evt.target.reset();
    closePopup();
  } catch {
    console.log(`Ошибка ${err}`);
  } finally {
    renderLoading(evt.submitter, false);
  }
});

// ВАЛИДАЦИЯ ФОРМ

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input-item",
//   submitButtonSelector: ".popup__save-button",
//   inactiveButtonClass: "popup__save-button_disabled",
//   inputErrorClass: "popup__input-item_error",
//   errorClass: "popup__error_hidden",
// });

// валицация формы редактирования профиля
const editFormValidator = new FormValidator({
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-item_error",
  errorClass: "popup__error_hidden",
}, profileForm);

// валидация формы добавления карточки
const addCardFormValidator = new FormValidator({
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-item_error",
  errorClass: "popup__error_hidden",
}, cardForm);

// валидация формы редактирования аватара
const avatarFormValidator = new FormValidator({
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-item_error",
  errorClass: "popup__error_hidden",
}, avatarForm);

// включение валидации
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

