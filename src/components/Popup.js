export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.addEventListener(
      "click",
      this._closePopupByOverlayClick.bind(this)
    );
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.removeEventListener(
      "click",
      this._closePopupByOverlayClick.bind(this)
    );
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  _closePopupByOverlayClick(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
