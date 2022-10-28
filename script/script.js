// переменные

const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('#edit-profile-popup');
const addPopup = document.querySelector('#add-item-popup');
const imagePopup = document.querySelector('#image-popup');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


const closeButtons = document.querySelectorAll('.popup__close-button');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['add-place'];

const gallery = document.querySelector('.gallery');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileNameInput = document.querySelector('#name');
const profileStatusInput = document.querySelector('#status');

const newCardLink = document.querySelector('#link');
const newCardTitle = document.querySelector('#title');

const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');


// базовый набор карточек

const initialCards = [
  {
    name: 'Киев',
    link: 'https://images.unsplash.com/photo-1591994719351-273dbc03f137?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    name: 'Варшава',
    link: 'https://images.unsplash.com/photo-1577133192629-5140c5371590?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Берлин',
    link: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Калгари',
    link: 'https://images.unsplash.com/photo-1625459675577-b6f8ac15c489?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Харьков',
    link: 'https://images.unsplash.com/photo-1596807460462-9395f786a850?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80'
  },
  {
    name: 'Прага',
    link: 'https://images.unsplash.com/photo-1621976341358-4192c01f2e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1809&q=80'
  }
];

// функция создания новых карточек (возвращает готовую карточку с функциями открытия, лайка и удаления)

function createCard(item) {
  const galleryTemplate = document.querySelector('#gallery-element').content;
  const cardElement = galleryTemplate.querySelector('.gallery-element').cloneNode(true);

  const cardElementTitle = cardElement.querySelector('.gallery-element__title');
  const cardElementImage = cardElement.querySelector('.gallery-element__picture');

  const deleteButton = cardElement.querySelector('.gallery-element__trash');
  const likeButton = cardElement.querySelector('.gallery-element__like-button');



  cardElementTitle.textContent = item.name;
  cardElementImage.src = item.link;
  cardElementImage.alt = `Картинка: ${item.name}`;

  //открытие картинок в отдельном модальном окне
  cardElementImage.addEventListener('click', (evt) => {
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = cardElementTitle.textContent;
    openPopup(imagePopup);
  })

  //удаление карточек

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  //лайк карточек

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('gallery-element__like-button_active');
  });

  return cardElement
}

// вставка 6 базовых картинок

initialCards.forEach(item => {
  const galleryElement = createCard(item)
  gallery.append(galleryElement);
})

// функционал открытия и закрытия модальных окон

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;
  openPopup(editPopup);
})

addButton.addEventListener('click', () => {
  openPopup(addPopup);
})


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

// // функционал редактирования профиля

function changeProfile(name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
}

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const profileName = profileNameInput.value;
  const profileStatus = profileStatusInput.value;

  changeProfile(profileName, profileStatus);

  const popup = evt.target.closest('.popup');
  closePopup(popup);
});


// //функционал добавления новых карточек

function addElement(elementSrc, elementTitle) {
  const item = {
    link: elementSrc,
    name: elementTitle
  }
  const galleryElement = createCard(item)
  gallery.prepend(galleryElement);
}

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addElement(newCardLink.value, newCardTitle.value);
  evt.target.reset();

  const popup = evt.target.closest('.popup');
  closePopup(popup);
});


