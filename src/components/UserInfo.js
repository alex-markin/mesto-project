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
      this._avatar.src = sendProfileChanges.avatar;
      localStorage.setItem("name", sendProfileChanges.name);
      localStorage.setItem("status", sendProfileChanges.about);
      localStorage.setItem("avatar", sendProfileChanges.avatar);
    } catch {
      console.log(`Ошибка ${err}`);
    }
  }

  // получение данных пользователя из локального хранилища
  getUserInfoFromLocalStorage() {
    this._name.textContent = localStorage.getItem("name");
    this._status.textContent = localStorage.getItem("status");
    this._avatar.src = localStorage.getItem("avatar");
  }
}
