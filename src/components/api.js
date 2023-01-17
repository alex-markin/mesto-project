export {
  getInfo,
  sendProfileChanges,
  getCards,
  sendNewCard,
  updateAvatar,
  deleteCard,
  like,
  unlike,
};
import { profileName, profileStatus } from "./utils.js";
import { createCard, gallery } from "./createCards.js";
import { avatarImg, renderLoading } from "../index.js";

// подтягивание данных профиля при загрузке страницы

async function getInfo() {
  try {
    const fetchRes = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/users/me",
      {
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
          "Content-Type": "application/json",
        },
      }
    );

    const jsonRes = await fetchRes.json();
    avatarImg.src = jsonRes.avatar;
    profileName.textContent = jsonRes.name;
    profileStatus.textContent = jsonRes.about;

    return jsonRes;

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// обновление профиля
async function sendProfileChanges(name, status) {
  try {
    const fetchRes = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.textContent,
          about: status.textContent,
        }),
      }
    );
  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// загрузка карточек с сервера

async function getCards() {
  try {
    const response = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/cards ",
      {
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    res.forEach((item) => {
      const galleryElement = createCard(item);
      const deleteButton = galleryElement.querySelector(
        ".gallery-element__trash"
      );

      if (item.owner.name == profileName.textContent) {
        deleteButton.classList.add("gallery-element__trash_visible");
      }

      gallery.append(galleryElement);
    });

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// отправка новой карточки на сервер

async function sendNewCard(cardName, cardLink) {
  try {
    await fetch("https://nomoreparties.co/v1/plus-cohort-18/cards ", {
      method: "POST",
      headers: {
        authorization: "cf2f740d-de00-436f-a166-58000bce866a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    });

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// удаление карточки пользователя

async function deleteCard(cardId) {
  try {
    await fetch(`https://nomoreparties.co/v1/plus-cohort-18/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "cf2f740d-de00-436f-a166-58000bce866a",
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// обновление аватара

async function updateAvatar(avatarLink) {
  try {
    await fetch("https://nomoreparties.co/v1/plus-cohort-18/users/me/avatar ", {
      method: "PATCH",
      headers: {
        authorization: "cf2f740d-de00-436f-a166-58000bce866a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// лайк карточки

async function like(cardId, cardElement) {
  try {
    const fetchRes = await fetch(
      `https://nomoreparties.co/v1/plus-cohort-18/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
          "Content-Type": "application/json",
        },
      }
    );
    const jsonRes = await fetchRes.json();

    const likeCount = cardElement.querySelector(".gallery-element__like-count");
    likeCount.textContent = jsonRes.likes.length;

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// снятие лайка карточки

async function unlike(cardId, cardElement) {
  try {
    const fetchRes = await fetch(
      `https://nomoreparties.co/v1/plus-cohort-18/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
          "Content-Type": "application/json",
        },
      }
    );
    const jsonRes = await fetchRes.json();

    const likeCount = cardElement.querySelector(".gallery-element__like-count");
    likeCount.textContent = jsonRes.likes.length;

  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}



