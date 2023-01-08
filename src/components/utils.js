export {openPopup, closePopup, editButtonHandler, changeProfile, like, closePopupByEsc, closePopupByOverlayClick}; //funtions

export {profileNameInput, profileStatusInput}; //consts


const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('#edit-profile-popup');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileNameInput = document.querySelector('#name');
const profileStatusInput = document.querySelector('#status');

function openPopup(popup) {
  popup.classList.add('popup_opened');

}

function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove('popup_opened');
  })
}

function editButtonHandler() {
  const submitButton = editPopup.querySelector('.popup__save-button');

  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;
  submitButton.disabled = false;
  submitButton.classList.remove('popup__save-button_disabled');
  openPopup(editPopup);
}

function changeProfile(name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
}

function like(evt) {
  if (evt.target.classList.contains('gallery-element__like-button')) {
    evt.target.classList.toggle('gallery-element__like-button_active');
  }
}

function closePopupByEsc(evt) {
  if (evt.key == 'Escape') {
    closePopup();
  }
}

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}
