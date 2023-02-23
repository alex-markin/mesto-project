import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._popup.querySelector(".popup__img").src = link;
    this._popup.querySelector(".popup__img").alt = name;
    this._popup.querySelector(".popup__caption").textContent = name;
  }
}
