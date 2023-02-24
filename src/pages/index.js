import "./index.css"; //  CSS стили
import {
  editButton,
  addButton,
  profileForm,
  cardForm,
  editAvatar,
  avatarForm,
  avatarImg,
  profileName,
  profileStatus,
  profileNameInput,
  profileStatusInput,
  gallerySelector,
  headers,
  baseURL
} from "../components/globalConsts.js"; // глобальные переменные

// импорт классов
import { Api } from "../components/Api.js"; // работа с API
import { Card } from "../components/Card.js"; // класс для создания карточки
import { UserInfo } from "../components/UserInfo"; // класс для работы с профилем
import { PopupWithForm } from "../components/PopupWithForm"; // класс для работы с формами
import { PopupWithImage } from "../components/PopupWithImage";  // класс для работы с картинками
import { Section } from "../components/Section"; // класс для создания карточек
import { FormValidator } from "../components/FormValidator.js"; // валидация форм


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
    const userInfo = new UserInfo({
      nameSelector: ".profile__name",
      statusSelector: ".profile__status",
      avatarSelector: ".profile__avatar",
      api: api,
    });

    userInfo.getUserInfoFromLocalStorage(); // возврат данных из локального хранилища
    userInfo.setUserInfo(info[0]); // подгрузка обновленных данных с сервера

    // рендер карточек c сервера
    const cardList = new Section({
      data: info[1],
      renderer: (item) => {
        const card = new Card({
          item: item,
          profile: info[0],
          selector: '#gallery-element',
          api: api,
          handleCardClick: () => {
            const popupWithImage = new PopupWithImage(".popup_image");
            popupWithImage.open(item.name, item.link);
            popupWithImage.setEventListeners();
          },
        });

        const cardElement = card.generateCard();
        cardList.appendItem(cardElement);

      }}, gallerySelector);
      cardList.renderItems();
  } catch {
    console.log(`Ошибка ${err}`);
  }
}

renderInfo()


// РАБОТА МОДАЛЬНЫХ ОКОН

// создание editPopup

const editPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: async (data) => {
    editPopup.renderLoading(true);
    try {
      const profileName = data.name;
      const profileStatus = data.status;

      const newProfile = new UserInfo({
        nameSelector: ".profile__name",
        statusSelector: ".profile__status",
        avatarSelector: ".profile__avatar",
        api: api
      });

      await newProfile.setUserInfo({name: profileName, about: profileStatus});

      editPopup.close();
    } catch {
      console.log(`Ошибка ${err}`);
    } finally {
      editPopup.renderLoading(false);
    }
  },
});

// открытие editPopup
editButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;

  editPopup.open();
});


// создание addCardPopup
const addCardPopup = new PopupWithForm({
  popupSelector: "#add-item-popup",
  handleFormSubmit: async (data) => {
    try {
    addCardPopup.renderLoading(true);
    const cardName = data.title;
    const cardLink = data.link;

    const sendNewCard = await api.sendNewCard({name: cardName, link: cardLink});
    const profile = await api._getInfo();

    const newCardRender = new Section({
      data: [sendNewCard],
      renderer: (item) => {

        const card = new Card({
          item: item,
          profile: profile[0],
          selector: '#gallery-element',
          api: api,
          handleCardClick: () => {
            const popupWithImage = new PopupWithImage(".popup_image");
            popupWithImage.open(item.name, item.link);
            popupWithImage.setEventListeners();
          }
        });

        const cardElement = card.generateCard();
        newCardRender.prependItem(cardElement);
    }
  }, gallerySelector);

  newCardRender.renderItems();
  addCardPopup.close();
} catch {
  console.log(`Ошибка ${err}`);
} finally {
  addCardPopup.renderLoading(false);
}
  }
});


// открытие addCardPopup
addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// создание avatarPopup
const avatarPopup = new PopupWithForm({
  popupSelector: "#edit-avatar-popup",
  handleFormSubmit: async (data) => {
    try {
      avatarPopup.renderLoading(true);
      const avatarLink = data.avatarLink;
      const updateAvatar = await api.updateAvatar(avatarLink);
      avatarImg.src = updateAvatar.avatar;
      avatarPopup.close();
    } catch {
      // console.log(`Ошибка ${err}`);
    } finally {
      avatarPopup.renderLoading(false);
    }
  }
});

// открытие avatarPopup
editAvatar.addEventListener("click", () => {
  avatarPopup.open();
});

// ВАЛИДАЦИЯ ФОРМ

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


