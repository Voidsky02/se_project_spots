const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const formList = Array.from(document.querySelectorAll('.modal__form'));

function showInputError(formElement) {
  formElement.classList.add(settings.errorClass);
}

function hideInputError(formElement) {
  formElement.classList.remove(settings.errorClass);
}

function checkInputValidity(config) {}

function setEventListeners(formElement, config) {
  // dont know about this code below
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.addEventListener(submit, (event) => {
    event.preventDefault();
  });

  const inputElement = formElement.querySelector(settings.inputSelector);
  inputElement.addEventListener(input, checkInputValidity);
}

// below function will automatically add validation to new elements
function enableValidation(config) {
  const formList = document.querySelectorAll(settings.formSelector);

  formList.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
}
// above code must prevent default submit events automatically &
// add input event listeners to every input element in a form automatically
