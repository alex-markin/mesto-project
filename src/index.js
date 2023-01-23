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
  sendNewCard,
  updateAvatar,
  sendProfileChanges
} from "./components/api.js"; // работа с API

import {
  openPopup,
  closePopup,
  renderLoading,
  changeProfile,
} from "./components/utils.js"; // повторяющиеся функции

import { enableValidation } from "./components/validation.js"; // валидация форм

import { addElement, createCard } from "./components/createCards.js"; // создание новой карточки


// рендер профиля и карточек с сервера

async function renderInfo() {
  try {
    const info = await getInfo();
    // рендер профиля
    avatarImg.src = info[0].avatar;
    profileName.textContent = info[0].name;
    profileStatus.textContent = info[0].about;

    // рендер карточек
    info[1].forEach((item) => {
      const galleryElement = createCard(item, info[0]);
      gallery.append(galleryElement);
    });
  } catch {
    console.log(`Ошибка ${err}`);
  }
}

renderInfo()

// обработчик формы добавления новых карточек

cardForm.addEventListener("submit", async (evt) => {
  renderLoading(evt.submitter, true);
  try {
    const newCard = await sendNewCard(newCardTitle.value, newCardLink.value)
    addElement(newCard)
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
    await sendProfileChanges(profileName, profileStatus);
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
    await updateAvatar(avatarLink.value);
    avatarImg.src = avatarLink.value;
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
