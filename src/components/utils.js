export {
  openPopup,
  closePopup,
  editButtonHandle,
  changeProfile,
  closePopupByEsc,
  closePopupByOverlayClick,
  renderLoading
}; //funсtions

export { profileNameInput, profileStatusInput, profileName, profileStatus }; //consts

import { sendProfileChanges } from "./api.js";

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector("#edit-profile-popup");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileNameInput = document.querySelector("#name");
const profileStatusInput = document.querySelector("#status");

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
  popups.forEach((popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByEsc);
    popup.removeEventListener("click", closePopupByOverlayClick);
  });
}

// обработчик кнопки открытия окна редактирования профиля

function editButtonHandle() {
  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;
  openPopup(editPopup);
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
    submitButton.value = 'Сохранить...';
  } else {
    submitButton.value = 'Сохранить';
  }
}
