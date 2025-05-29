import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

/* Created an array of data for current cards */
// const initialCards = [
//   {
//     name: "Red bridge over large lake",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

/* added functionality to edit profile and close buttons */

// function for opening and closing modals (Universal)
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", isKeyEscape);
}

// add this function wherever i need to close modals aka close & submit buttons
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  removeEscapeKeyFunc();
}

const isKeyEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
};

// made removing escape key listener a function for easier reusability
const removeEscapeKeyFunc = () => {
  document.removeEventListener("keydown", isKeyEscape);
};

// applying toggleModal function to edit-profile buttons
const editProfileModal = document.querySelector("#edit-modal");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileCloseBtn = document.querySelector("#profile__close-btn");

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = userName.textContent;
  profileDescriptionInput.value = userDescription.textContent;
  resetValidation(
    editProfileModal,
    [profileNameInput, profileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});
profileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

// applying toggleModal function to new-post buttons
const newPostModal = document.querySelector("#new-post__modal");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = document.querySelector("#new-post__close-btn");

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

// applying toggleModal function to image preview buttons
const previewModal = document.querySelector("#preview__modal");
const previewModalImage = document.querySelector(".modal__img_type_preview");
const previewModalTitle = document.querySelector(".modal__title_type_preview");
const previewCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);
previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

/* JS scode to make placeholders of edit profile form match name and description
of User profile vvv */

const userAvatar = document.querySelector(".profile__avatar");
const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");

/* Making save button of edit profile modal functional, updating the users profile name and description.
Also making sure the close button does not save the entered information vvv */

function handleProfileFormSubmit(event) {
  event.preventDefault();

  // userName.textContent = profileNameInput.value;
  // userDescription.textContent = profileDescriptionInput.value;

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      userName.textContent = data.name;
      userDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    });
}

const profileModalForm = document.forms["profile__modal_form"];

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

/* Switch cards from hard coded HTML to Templates reproducable with JS */

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn-selected");
  });
  // ^ above code adds interactivity to like button

  //
  //
  //
  // Delete Card Functionality

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    // cardElement.remove();
    openModal(deleteModal);
  });
  // ^ above code adds interactivity to delete button

  //
  //
  //
  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalTitle.textContent = data.name;
  });
  //  ^ above code adds event handlers for preview of pictures

  return cardElement;
}

// added in Sprint 6 project
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

/* Making New-Post submit button functional for adding cards */
const imageLinkInput = document.querySelector("#image-link");
const imageCaptionInput = document.querySelector("#image-caption");

function handleNewPostSubmit(event) {
  event.preventDefault();

  const newPic = {};

  newPic.name = imageCaptionInput.value;
  newPic.link = imageLinkInput.value;

  const newUserPost = getCardElement(newPic);

  cardsList.prepend(newUserPost);

  closeModal(newPostModal);

  event.target.reset();
  disableButton(cardSubmitBtn, settings);
}

const newPostModalForm = document.querySelector("#new-post__modal_form");
newPostModalForm.addEventListener("submit", handleNewPostSubmit);

// below is code for closing modals when clicking outside of area
const modalList = document.querySelectorAll(".modal");

// made event 'mousedown' because modal would close when highlighting input
// to delete but releasing the mouse over the dark modal section
const setModalEventListeners = (modalArray) => {
  modalArray.forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal")) {
        closeModal(modal);
      }
    });
  });
};

setModalEventListeners(modalList);

enableValidation(settings);

//
//
//
//
//
//

// Delete modal functionality
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector("#delete__close-btn");
const deleteModalCancelBtn = deleteModal.querySelector("#cancel-btn");

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

// Avatar form elements
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalCloseBtn = avatarModal.querySelector("#avatar__close-btn");

// Avatar form submit function
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  // finish this!!
  api
    .editAvatar(avatarLinkInput.value)
    .then((data) => {
      userAvatar.src = data.avatar;
      closeModal(avatarModal);
      evt.target.reset();
      disableButton(avatarSubmitBtn, settings);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Avatar event listeners
editAvatarBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

/* API Class initializations below */

/* Boiler PLate Below */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2614c96a-b56e-4551-baaa-15c592c84c27",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    // handle initial cards
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
    });

    // handle user info
    userAvatar.src = userInfo.avatar;
    userName.textContent = userInfo.name;
    userDescription.textContent = userInfo.about;
  })
  .catch((err) => {
    console.error(err);
  });
