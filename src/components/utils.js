export { addDeleteButton }; //consts

import { sendProfileChanges } from "./api.js";

import {
  profileName,
  profileStatus
} from "./globalConsts.js"; // глобальные переменные

export {
  openPopup,
  closePopup,
  changeProfile,
  closePopupByEsc,
  closePopupByOverlayClick,
  renderLoading,
};

// закрытие попапа

function closePopupByEsc(evt) {
  if (evt.key == "Escape") {
    closePopup();
  }
}

// обработчик клика на оверлей для закрытия попапа

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup();
  }
}

// открытие попапа

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByOverlayClick);
}

// закрытие попапа

function closePopup() {
  const popup = document.querySelector(".popup_opened");
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("click", closePopupByOverlayClick);
}

// внесение изменений в профиль

function changeProfile(name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
  sendProfileChanges(profileName, profileStatus);
}

// обработка загрузки

function renderLoading(submitButton, isLoading) {
  if (isLoading) {
    submitButton.value = "Сохранить...";
  } else {
    submitButton.value = "Сохранить";
  }
}

// добавление кнопки удаления на карточки пользователя

function addDeleteButton(button, cardId, authorId) {
  if (cardId == authorId) {
    button.classList.add("gallery-element__trash_visible");
  }
}
