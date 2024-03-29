import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector(".popup__img");
  }

  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popup.querySelector(".popup__caption").textContent = name;
  }
}
