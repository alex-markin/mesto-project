export { FormValidator };

// класс валидации форм
class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
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
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleSubmitButton(inputList, submitButton);

    inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputItem);
        this._toggleSubmitButton(inputList, submitButton);
      });
    });

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleSubmitButton(inputList, submitButton);
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

// инициация валидации форм

// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setInputListeners(formElement);
//   });

// // отображение ошибки

//   function showInputError(formElement, inputItem, inputItemErrorMessage) {
//     const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
//     inputItem.classList.add(config.inputErrorClass);
//     errorElement.textContent = inputItemErrorMessage;
//     errorElement.classList.remove(config.errorClass);
//   }

// // сокрытие ошибки

//   function hideInputError(formElement, inputItem) {
//     const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
//     inputItem.classList.remove(config.inputErrorClass);
//     errorElement.textContent = "";
//     errorElement.classList.add(config.errorClass);
//   }

// // проверка валидности всей формы

//   function checkFormValidity(inputList) {
//     return inputList.some((inputItem) => {
//       return !inputItem.validity.valid;
//     });
//   }

// // активация/деактивация кнопки "Сохранить"

//   function toggleSubmitButton(inputList, submitButton) {
//     if (checkFormValidity(inputList)) {
//       submitButton.disabled = true;
//       submitButton.classList.add(config.inactiveButtonClass);
//     } else {
//       submitButton.disabled = false;
//       submitButton.classList.remove(config.inactiveButtonClass);
//     }
//   }
// // проверка валидности input
//   function checkInputValidity(formElement, inputItem) {
//     if (inputItem.validity.patternMismatch) {
//       inputItem.setCustomValidity(inputItem.dataset.errorMessage);
//     } else {
//       inputItem.setCustomValidity("");
//     }
//     if (!inputItem.validity.valid) {
//       showInputError(formElement, inputItem, inputItem.validationMessage);
//     } else {
//       hideInputError(formElement, inputItem);
//     }
//   }

// // активация валидации input и сброс формы

//   function setInputListeners(formElement) {
//     const inputList = Array.from(
//       formElement.querySelectorAll(config.inputSelector)
//     );
//     const submitButton = formElement.querySelector(config.submitButtonSelector);

//     toggleSubmitButton(inputList, submitButton);

//     inputList.forEach((inputItem) => {
//       inputItem.addEventListener("input", () => {
//         checkInputValidity(formElement, inputItem);
//         toggleSubmitButton(inputList, submitButton);
//       });
//     });

//     formElement.addEventListener("reset", () => {
//       setTimeout(() => {
//         toggleSubmitButton(inputList, submitButton);
//       }, 0);
//     });
//   }
// }
