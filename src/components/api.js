export {
  getInfo,
  sendProfileChanges,
  sendNewCard,
  updateAvatar,
  deleteCard,
  like,
  unlike,
};

// запрос данных о профиле и карточках при загрузке страницы

async function getInfo() {
  try {
    const userFetch = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/users/me",
      {
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
          "Content-Type": "application/json",
        },
      }
    );

    const cardsFetch = await fetch(
      "https://nomoreparties.co/v1/plus-cohort-18/cards ",
      {
        headers: {
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
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

async function like(cardId) {
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
          authorization: "cf2f740d-de00-436f-a166-58000bce866a",
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
