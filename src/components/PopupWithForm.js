import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ( {popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input-item");
    this.setEventListeners();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;

  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._form.querySelector(".popup__save-button").textContent = "Сохранение...";
    } else {
      this._form.querySelector(".popup__save-button").textContent = "Сохранить";
    }
  }


}
