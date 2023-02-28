export class UserInfo {
  constructor({ nameSelector, statusSelector, avatarSelector, api }) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._api = api;
  }

  // получение данных пользователя с сервера
  async getUserInfo() {
    const userInfo = await this._api._getInfo();
    return userInfo[0];
  }

  // комментарий для ревьюера: не совсем понятет коментарий, с учётом, что задание сформулировано так: Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
  //Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.

  // отправка данных пользователя на сервер, обновление данных на странице и в локальном хранилище
  async setUserInfo(data) {
    try {
      const sendProfileChanges = await this._api.sendProfileChanges(
        data.name,
        data.about
      );
      this._name.textContent = sendProfileChanges.name;
      this._status.textContent = sendProfileChanges.about;
    } catch (err) {
      console.log(`Ошибка ${err}`);
    }
  }

  // обновление аватара пользователя
  async setUserAvatar(data) {
    try {
      const sendAvatarChanges = await this._api.updateAvatar(data.avatar);
      this._avatar.src = sendAvatarChanges.avatar;
    } catch (err) {
      console.log(`Ошибка ${err}`);
    }
  }
}
