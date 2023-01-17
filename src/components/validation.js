export { enableValidation };

// инициация валидации форм

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setInputListeners(formElement);
  });

// отображение ошибки

  function showInputError(formElement, inputItem, inputItemErrorMessage) {
    const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(config.inputErrorClass);
    errorElement.textContent = inputItemErrorMessage;
    errorElement.classList.remove(config.errorClass);
  }

// сокрытие ошибки

  function hideInputError(formElement, inputItem) {
    const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.add(config.errorClass);
  }

// проверка валидности всей формы

  function checkFormValidity(inputList) {
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

// активация/деактивация кнопки "Сохранить"

  function toggleSubmitButton(inputList, submitButton) {
    if (checkFormValidity(inputList)) {
      submitButton.disabled = true;
      submitButton.classList.add(config.inactiveButtonClass);
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove(config.inactiveButtonClass);
    }
  }
// проверка валидности input
  function checkInputValidity(formElement, inputItem) {
    if (inputItem.validity.patternMismatch) {
      inputItem.setCustomValidity(inputItem.dataset.errorMessage);
    } else {
      inputItem.setCustomValidity("");
    }
    if (!inputItem.validity.valid) {
      showInputError(formElement, inputItem, inputItem.validationMessage);
    } else {
      hideInputError(formElement, inputItem);
    }
  }

// активация валидации input и сброс формы

  function setInputListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    toggleSubmitButton(inputList, submitButton);

    inputList.forEach((inputItem) => {
      inputItem.addEventListener("input", () => {
        checkInputValidity(formElement, inputItem);
        toggleSubmitButton(inputList, submitButton);
      });
    });

    formElement.addEventListener("reset", () => {
      setTimeout(() => {
        toggleSubmitButton(inputList, submitButton);
      }, 0);
    });
  }
}
