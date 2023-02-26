export { FormValidator };

// класс валидации форм
class FormValidator {
  constructor({config}, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector);
  }

  // включение валидации
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }

  // установка слушателей
  _setInputListeners() {
    this._toggleSubmitButton(this._inputList, this._submitButton);

    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputItem);
        this._toggleSubmitButton(this._inputList, this._submitButton);
      });
    });

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleSubmitButton(this._inputList, this._submitButton);
      }, 0);
    });
  }

  // активация/деактивация кнопки "Сохранить"
  _toggleSubmitButton(inputList, submitButton) {
    if (this._checkFormValidity(inputList)) {
      submitButton.disabled = true;
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  // проверка валидности всей формы
  _checkFormValidity(inputList) {
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  // проверка валидности input
  _checkInputValidity(formElement, inputItem) {
    if (inputItem.validity.patternMismatch) {
      inputItem.setCustomValidity(inputItem.dataset.errorMessage);
    } else {
      inputItem.setCustomValidity("");
    }
    if (!inputItem.validity.valid) {
      this._showInputError(formElement, inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(formElement, inputItem);
    }
  }

  // отображение ошибки
  _showInputError(formElement, inputItem, inputItemErrorMessage) {
    const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(this._inputErrorClass);
    errorElement.textContent = inputItemErrorMessage;
    errorElement.classList.remove(this._errorClass);
  }

  // сокрытие ошибки
  _hideInputError(formElement, inputItem) {
    const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.add(this._errorClass);
  }
}
