/* Created an array of data for current cards */
const initialCards = [
  {
    name: "Red bridge over large lake",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

/* added functionality to edit profile and close buttons */

// function for opening and closing modals (Universal)
function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
  profileNameInput.value = userName.textContent;
  profileDescriptionInput.value = userDescription.textContent;
}

// applying toggleModal function to edit-profile buttons
const editProfileModal = document.querySelector("#edit-modal");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileCloseBtn = document.querySelector("#profile__close-btn");

profileEditBtn.addEventListener("click", () => {
  toggleModal(editProfileModal);
});
profileCloseBtn.addEventListener("click", () => {
  toggleModal(editProfileModal);
});

// applying toggleModal function to new-post buttons
const newPostModal = document.querySelector("#new-post__modal");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = document.querySelector("#new-post__close-btn");

newPostBtn.addEventListener("click", () => {
  toggleModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  toggleModal(newPostModal);
});

// applying toggleModal function to image preview buttons
const previewModal = document.querySelector("#preview__modal");
const previewModalImage = document.querySelector(".preview__modal-img");
const previewModalTitle = document.querySelector(".preview__title");
const previewCloseBtn = document.querySelector(".preview__close-btn");
previewCloseBtn.addEventListener("click", () => {
  toggleModal(previewModal);
});

/* JS scode to make placeholders of edit profile form match name and description
of User profile vvv */

const userName = document.querySelector(".profile__name");
const userDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");

/* Making save button of edit profile modal functional, updating the users profile name and description.
Also making sure the close button does not save the entered information vvv */

function handleProfileFormSubmit(event) {
  event.preventDefault();

  userName.textContent = profileNameInput.value;
  userDescription.textContent = profileDescriptionInput.value;

  toggleModal(editProfileModal);
}

const profileModalForm = document.querySelector("#profile__modal_form");

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

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    const deleteElement = cardDeleteBtn.closest(".card");
    deleteElement.remove();
  });
  // ^ above code adds interactivity to delete button

  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", () => {
    toggleModal(preview__modal);
    previewModalImage.src = data.link;
    previewModalTitle.textContent = data.name;
  });
  //  ^ above code adds event handlers for preview of pictures

  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

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

  toggleModal(newPostModal);
}

const newPostModalForm = document.querySelector("#new-post__modal_form");
newPostModalForm.addEventListener("submit", handleNewPostSubmit);
