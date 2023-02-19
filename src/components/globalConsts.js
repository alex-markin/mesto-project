// вводные данные для работы с сервером

export const userID = "535b40ada043188a626ed8d6"; // уникальный ID пользователя
export const authorization = "cf2f740d-de00-436f-a166-58000bce866a"; // код авторизации сервера
export const baseURL = "https://nomoreparties.co/v1/plus-cohort-18";
export const headers = {
  authorization: authorization,
  "Content-Type": "application/json",
};

// селекторы

export const addPopup = document.querySelector("#add-item-popup");
export const avatarPopup = document.querySelector("#edit-avatar-popup");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const closeButtons = document.querySelectorAll(".popup__close-button");

export const profileForm = document.forms["edit-profile"];

export const cardForm = document.forms["add-place"];
export const newCardLink = cardForm.elements.link;
export const newCardTitle = cardForm.elements.title;

export const editAvatar = document.querySelector(".profile__avatar-container");
export const avatarForm = document.forms["edit-avatar"];
export const avatarLink = avatarForm.elements.avatarLink;
export const avatarImg = document.querySelector(".profile__avatar");

export const popups = document.querySelectorAll(".popup");
export const editPopup = document.querySelector("#edit-profile-popup");
export const profileName = document.querySelector(".profile__name");
export const profileStatus = document.querySelector(".profile__status");
export const profileNameInput = document.querySelector("#name");
export const profileStatusInput = document.querySelector("#status");

export const imagePopup = document.querySelector("#image-popup");
export const popupImg = document.querySelector(".popup__img");
export const popupCaption = document.querySelector(".popup__caption");
export const gallery = document.querySelector(".gallery");
export const gallerySelector = ".gallery";
