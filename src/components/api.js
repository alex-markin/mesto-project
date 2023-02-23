export {
  getInfo,
  sendProfileChanges,
  sendNewCard,
  updateAvatar,
  deleteCard,
  like,
  unlike,
  Api,
};

import { authorization } from "./globalConsts.js";

// класс для работы с API
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _getInfo() {
    try {
      const userFetch = await fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
      });

      const cardsFetch = await fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
      });

      const userInfo = await userFetch.json();
      const cards = await cardsFetch.json();

      const results = [userInfo, cards];
      return results;
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  async sendProfileChanges(name, status) {
    try {
      await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          about: status,
        }),
      });
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  async sendNewCard(name, link) {
    try {
      const fetchRes = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      });

      const newCardInfo = fetchRes.json();
      return newCardInfo;
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  async updateAvatar(link) {
    try {
      await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
        body: JSON.stringify({
          avatar: link,
        }),
      });
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  async deleteCard(cardID) {
    try {
      await fetch(`${this._baseUrl}/cards/${cardID}`, {
        method: "DELETE",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
      });
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  async like(cardID) {
    try {
      const like = await fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
        method: "PUT",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
      });

      const likeCount = like.json();
      return likeCount;
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  async unlike(cardID) {
    try {
      const unlike = await fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
        method: "DELETE",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
      });

      const unlikeCount = unlike.json();
      return unlikeCount;
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }
}

// запрос данных о профиле и карточках при загрузке страницы

async function getInfo() {
  try {
    const userFetch = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/users/me",
      {
        headers: {
          authorization: authorization,
          "Content-Type": "application/json",
        },
      }
    );

    const cardsFetch = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/cards ",
      {
        headers: {
          authorization: authorization,
          "Content-Type": "application/json",
        },
      }
    );

    const userInfo = await userFetch.json();
    const cards = await cardsFetch.json();

    const results = [userInfo, cards];
    return results;
  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// обновление профиля
async function sendProfileChanges(name, status) {
  try {
    await fetch("https://nomoreparties.co/v1/plus-cohort-18/users/me", {
      method: "PATCH",
      headers: {
        authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: status,
      }),
    });
  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}

// отправка новой карточки на сервер

async function sendNewCard(cardName, cardLink) {
  try {
    const fetchRes = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/cards",
      {
        method: "POST",
        headers: {
          authorization: authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink,
        }),
      }
    );

    const newCardInfo = fetchRes.json();
    return newCardInfo;
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
        authorization: authorization,
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
        authorization: authorization,
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

async function like(cardId) {
  try {
    const fetchRes = await fetch(
      `https://nomoreparties.co/v1/plus-cohort-18/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: authorization,
          "Content-Type": "application/json",
        },
      }
    );
    const jsonRes = await fetchRes.json();
    return jsonRes;
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
          authorization: authorization,
          "Content-Type": "application/json",
        },
      }
    );
    const jsonRes = await fetchRes.json();
    return jsonRes;
  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
}
