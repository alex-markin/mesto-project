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
  gallery,
  profileNameInput,
  profileStatusInput,
  editPopup,
} from "./components/globalConsts.js"; // глобальные переменные

import {
  getInfo,
  // getCards,
  sendNewCard,
  updateAvatar,
} from "./components/api.js"; // работа с API

import {
  openPopup,
  closePopup,
  renderLoading,
  changeProfile,
  addDeleteButton,
} from "./components/utils.js"; // повторяющиеся функции

import { enableValidation } from "./components/validation.js"; // валидация форм

import { addElement, createCard } from "./components/createCards.js"; // создание новой карточки

// обновление профиля с сервера

function loadProfile() {
  getInfo().then((data) => {
    avatarImg.src = data[0].avatar;
    profileName.textContent = data[0].name;
    profileStatus.textContent = data[0].about;
  });
}

loadProfile();

// загрузка карточек c сервера

function loadCards() {
  getInfo()
  .then((data) => {
    data[1].forEach((item) => {
      const galleryElement = createCard(item);
      const deleteButton = galleryElement.querySelector(
        ".gallery-element__trash"
      )

      addDeleteButton(deleteButton, item.owner._id, data[0]._id);

      gallery.append(galleryElement);
    })

  })
}

loadCards();

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

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  try {
    const profileName = profileNameInput.value;
    const profileStatus = profileStatusInput.value;
    const popup = evt.target.closest(".popup");
    changeProfile(profileName, profileStatus);
    closePopup(popup);
  } catch {
    console.log(`Ошибка ${err}`);
  } finally {
    renderLoading(evt.submitter, false);
  }
});

// обработчик формы добавления новых карточек

cardForm.addEventListener("submit", (evt) => {
  renderLoading(evt.submitter, true);
  try {
    sendNewCard(newCardTitle.value, newCardLink.value)
    addElement(newCardLink.value, newCardTitle.value)
    evt.target.reset()
    closePopup()
  } catch {
    console.log(`Ошибка ${err}`);
  } finally {
    renderLoading(evt.submitter, false);
  }
});

// обработчик формы редактирования Аватара

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  try {
    avatarImg.src = avatarLink.value;
    updateAvatar(avatarLink.value);
    evt.target.reset();
    closePopup();
  } catch {
    console.log(`Ошибка ${err}`);
  } finally {
    renderLoading(evt.submitter, false);
  }
});

// валидация форм

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-item_error",
  errorClass: "popup__error_hidden",
});
