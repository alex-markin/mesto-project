export {
  openPopup,
  closePopup,
  editButtonHandle,
  changeProfile,
  closePopupByEsc,
  closePopupByOverlayClick,
}; //funсtions

export { profileNameInput, profileStatusInput }; //consts

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector("#edit-profile-popup");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileNameInput = document.querySelector("#name");
const profileStatusInput = document.querySelector("#status");


function closePopupByEsc(evt) {
  if (evt.key == "Escape") {
    closePopup();
  }
}

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup();
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByOverlayClick);
}

function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByEsc);
    popup.removeEventListener("click", closePopupByOverlayClick);
  });
}

function editButtonHandle() {
  const submitButton = editPopup.querySelector(".popup__save-button");
  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;
  openPopup(editPopup);
}

function changeProfile(name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
}



