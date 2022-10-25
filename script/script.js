// переменные

const editPopup = document.querySelector('#edit-profile-popup');
const addPopup = document.querySelector('#add-item-popup');
const imgPopup = document.querySelector('.image-popup');


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close-button');
const saveButtons = document.querySelectorAll('.popup__save-button');

const gallery = document.querySelector('.gallery');


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

  // функционал добавления базового пакета карточек

  const initialCardsNames = initialCards.map(function (card) {
    return card.name;
  });
  const initialCardsLinks = initialCards.map(function (card) {
    return card.link;
  });

  function addInitialElements(elementSrc, elementTitle) {
    for (i = 0; i < initialCards.length; i++) {
      const galleryTemplate = document.querySelector('#gallery-element').content;
      const galleryElement = galleryTemplate.querySelector('.gallery-element').cloneNode(true);

      galleryElement.querySelector('.gallery-element__picture').src = elementSrc[i];
      galleryElement.querySelector('.gallery-element__title').textContent = elementTitle[i];

      gallery.prepend(galleryElement);
   }
  }

  addInitialElements(initialCardsLinks, initialCardsNames);

// функционал открытия и закрытия модальных окон
function popupClose() {
  if (editPopup.classList.contains('popup_opened')) {
    editPopup.classList.toggle('popup_opened');
  } else if (addPopup.classList.contains('popup_opened')) {
    addPopup.classList.toggle('popup_opened');
}
}

editButton.onclick = function() {
  let name = document.querySelector('#name');
  let status = document.querySelector('#status');

  name.value = document.querySelector('.profile__name').textContent;
  status.value = document.querySelector('.profile__status').textContent;
  editPopup.classList.add('popup_opened');
}

closeButtons.forEach(function(button) {
  button.addEventListener('click', function () {
    popupClose();
  });
});

// функционал редактирования профиля

function changeProfile(name, status) {
  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__status').textContent = status;
}

saveButtons[0].onclick = function(evt) {
  evt.preventDefault();
  let name = document.querySelector('#name').value;
  let status = document.querySelector('#status').value;

  changeProfile(name, status);
  popupClose();
}

addButton.onclick = function() {
  addPopup.classList.add('popup_opened');
}


//функционал добавления, удаления и лайка новых карточек

function addElement(elementSrc, elementTitle) {
  const galleryTemplate = document.querySelector('#gallery-element').content;
  const galleryElement = galleryTemplate.querySelector('.gallery-element').cloneNode(true);

  galleryElement.querySelector('.gallery-element__picture').src = elementSrc;
  galleryElement.querySelector('.gallery-element__title').textContent = elementTitle;

  gallery.prepend(galleryElement);

  deleteElement();
  imgOpen();
  imgClose();
}

saveButtons[1].addEventListener('click', function (evt) {
  evt.preventDefault();
  const link = document.querySelector('#link');
  const title = document.querySelector('#title');

  addElement(link.value, title.value);

  link.value = '';
  title.value= '';

  addPopup.classList.toggle('popup_opened');
  popupClose();
  like();
  imgClose();
});

// функционал открытия и закрытия картинки


function imgOpen() {
const imgPopupPic = document.querySelector('.image-popup__img');
const elementPic = document.querySelectorAll('.gallery-element__picture');
const caption = document.querySelector('.image-popup__caption');

elementPic.forEach(function(pic) {
  pic.addEventListener('click', function (evt) {
  imgPopupPic.src = evt.target.src;
  caption.textContent = evt.target.parentElement.children[2].children[0].textContent;
  imgPopup.classList.toggle('image-popup_opened')
})
})
}

function imgClose() {
  const imgCloseButton = document.querySelectorAll('.image-popup__close-button');

  imgCloseButton.forEach(function (button) {
    button.addEventListener('click', function () {
      imgPopup.classList.toggle('image-popup_opened');
  })
  })
}

imgOpen();
imgClose();


// функционал удаления карточек

function deleteElement() {
const deleteButtons = document.querySelectorAll('.gallery-element__trash');
deleteButtons.forEach(function(button) {
  button.addEventListener('click', function(evt) {
    evt.target.closest('.gallery-element').remove();
  });
})
}

deleteElement();

// функционал лайка карточки

function like() {
  document.querySelectorAll('.gallery-element__like-button').forEach(function (button) {
    button.addEventListener('click', function (evt) {
      evt.target.classList.toggle('gallery-element__like-button_active');
    })
  })
};

like();



