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
  baseURL,
} from "../components/globalConsts.js"; // глобальные переменные

// импорт классов
import { Api } from "../components/Api.js"; // работа с API
import { Card } from "../components/Card.js"; // класс для создания карточки
import { UserInfo } from "../components/UserInfo"; // класс для работы с профилем
import { PopupWithForm } from "../components/PopupWithForm"; // класс для работы с формами
import { PopupWithImage } from "../components/PopupWithImage"; // класс для работы с картинками
import { Section } from "../components/Section"; // класс для создания карточек
import { FormValidator } from "../components/FormValidator.js"; // валидация форм

// РЕНДЕРИНГ ПРОФИЛЯ И КАРТОЧЕК

// создание экземпляра класса Api
const api = new Api({
  baseUrl: baseURL,
  headers: headers,
});

// создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage(".popup_image");

// создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  statusSelector: ".profile__status",
  avatarSelector: ".profile__avatar",
  api: api,
});

// создание экземпляра класса Card
function createCard(item, profile, selector, api) {
  const card = new Card({
    item: item,
    profile: profile,
    selector: selector,
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
      popupWithImage.setEventListeners();
    },
    handleDeleteClick: async () => {
      try {
        api.deleteCard(item._id);
        card.deleteCard();
      } catch (err) {
        console.log(`Ошибка ${err}`);
      }
    },
    handleLikeClick: async (evt) => {
      if (card._isLiked) {
        try {
          const like = await api.unlike(item._id);
          card._likeCount.textContent = like.likes.length;
          card.setLikes(evt);
        } catch (err) {
          console.log(`Ошибка ${err}`);
        }
      } else {
        try {
          const like = await api.like(item._id);
          card._likeCount.textContent = like.likes.length;
          card.setLikes(evt);
        } catch (err) {
          console.log(`Ошибка ${err}`);
        }
      }
    },
  });
  return card.generateCard();
}

// рендеринг профиля и карточек с сервера
async function renderInfo() {
  try {
    const info = await api._getInfo();
    // рендер профиля
    userInfo.setUserInfo(info[0]);

    // рендер карточек c сервера
    const cardList = new Section(
      {
        // примечания для ревьюера: Не совсем понятно, как переиспользовать один экземпляр Section с учётом того, что у них отличается renderer. А вводные данные при рендере базовых карточек и создании новой отличаются. Мы же специально делаем Section гибким, чтобы можно было использовать его для разных целей. Поэтому я создаю новый экземпляр Section для каждого рендера.
        data: info[1],
        renderer: (item) => {
          const cardElement = createCard(
            item,
            info[0],
            "#gallery-element",
            api
          );
          cardList.appendItem(cardElement);
        },
      },
      gallerySelector
    );
    cardList.renderItems();
  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

renderInfo();

// РАБОТА МОДАЛЬНЫХ ОКОН

// создание editPopup

const editPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: async (data) => {
    editPopup.renderLoading(true);
    try {
      const profileName = data.name;
      const profileStatus = data.status;

      await userInfo.setUserInfo({ name: profileName, about: profileStatus });

      editPopup.close();
    } catch (err) {
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

      const sendNewCard = await api.sendNewCard({
        name: cardName,
        link: cardLink,
      });
      const profile = await userInfo.getUserInfo();

      const newCardRender = new Section(
        {
          data: [sendNewCard],
          renderer: (item) => {
            const cardElement = createCard(
              item,
              profile,
              "#gallery-element",
              api
            );
            newCardRender.prependItem(cardElement);
          },
        },
        gallerySelector
      );
      newCardRender.renderItems();
      addCardPopup.close();
    } catch (err) {
      console.log(`Ошибка ${err}`);
    } finally {
      addCardPopup.renderLoading(false);
    }
  },
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
    } catch (err) {
      // console.log(`Ошибка ${err}`);
    } finally {
      avatarPopup.renderLoading(false);
    }
  },
});

// открытие avatarPopup
editAvatar.addEventListener("click", () => {
  avatarPopup.open();
});

// ВАЛИДАЦИЯ ФОРМ

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-item_error",
  errorClass: "popup__error_hidden",
};

// валицация формы редактирования профиля
const editFormValidator = new FormValidator({ config }, profileForm);

// валидация формы добавления карточки
const addCardFormValidator = new FormValidator({ config }, cardForm);

// валидация формы редактирования аватара
const avatarFormValidator = new FormValidator({ config }, avatarForm);

// включение валидации
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
