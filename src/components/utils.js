import { sendProfileChanges } from "./Api.js";

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
}

// обработка загрузки

function renderLoading(submitButton, isLoading) {
  if (isLoading) {
    submitButton.value = "Сохранить...";
  } else {
    submitButton.value = "Сохранить";
  }
}


