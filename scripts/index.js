/* Created an array of data for current cards */
const initialCards = [
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

const editProfileModal = document.querySelector("#edit-modal");

const profileEditBtn = document.querySelector(".profile__edit-btn");

const profileCloseBtn = document.querySelector(".modal__close-btn");

function toggleProfileModal() {
  editProfileModal.classList.toggle("editProfileModalOpen");
}

profileEditBtn.addEventListener("click", toggleProfileModal);
profileCloseBtn.addEventListener("click", toggleProfileModal);

/* JS scode to make placeholders of edit profile form match name and description
of User profile vvv */

let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#name");
const profileDescriptionInput = document.querySelector("#description");

profileNameInput.setAttribute("placeholder", userName.textContent);
profileDescriptionInput.setAttribute(
  "placeholder",
  userDescription.textContent
);

/* Making save button of edit profile modal functional, updating the users profile name and description.
Also making sure the close button does not save the entered information vvv */

function handleProfileFormSubmit(event) {
  event.preventDefault();

  let nameInputValue = profileNameInput.value;
  let descriptionInputValue = profileDescriptionInput.value;

  userName.textContent = nameInputValue;
  userDescription.textContent = descriptionInputValue;

  editProfileModal.classList.toggle("editProfileModalOpen");
}

const profileModalForm = document.querySelector(".modal__form");

profileModalForm.addEventListener("submit", handleProfileFormSubmit);

/* Switch cards from hard coded HTML to Templates reproducable with JS */

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
