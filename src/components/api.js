export { Api };

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
    } catch(err) {
      console.log(`Ошибка ${err}`);
    }
  }

  async sendProfileChanges(name, status) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
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

      const newProfileInfo = res.json();
      return newProfileInfo;
    } catch(err) {
      console.log(`Ошибка ${err}`);
    }
  }

  async sendNewCard({ name, link }) {
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
    } catch(err) {
      console.log(`Ошибка ${err}`);
    }
  }

  async updateAvatar(link) {
    try {
      const sendNewAvatar = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._headers.authorization,
          "Content-Type": this._headers["Content-Type"],
        },
        body: JSON.stringify({
          avatar: link,
        }),
      });

      const newAvatarInfo = sendNewAvatar.json();
      return newAvatarInfo;
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
      console.log(`Ошибка ${err}`);
    }
  }
}
