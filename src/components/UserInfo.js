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


  // отправка данных пользователя на сервер, обновление данных на странице и в локальном хранилище
  async setUserInfo(data) {
    try {
      const sendProfileChanges = await this._api.sendProfileChanges(
        data.name,
        data.about
      );
      this._name.textContent = sendProfileChanges.name;
      this._status.textContent = sendProfileChanges.about;

      this.saveToLocalStorage("name", sendProfileChanges.name);
      this.saveToLocalStorage("about", sendProfileChanges.about);
    } catch (err) {
      console.log(`Ошибка ${err}`);
    }
  }

  // обновление аватара пользователя
  async setUserAvatar(data) {
    try {
      const sendAvatarChanges = await this._api.updateAvatar(data.avatar);
      this._avatar.src = sendAvatarChanges.avatar;
      this.saveToLocalStorage("avatar", sendAvatarChanges.avatar);
    } catch (err) {
      console.log(`Ошибка ${err}`);
    }
  }

  saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

}
