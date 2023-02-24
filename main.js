const board = document.getElementById("board");

let arr = [];
let score = 0;

let canClickCards = true;

const cardBacks = [
  "/images/card-backs/endless-constellation.svg",
  "/images/card-backs/liquid-cheese.svg",
  "/images/card-backs/radiant-gradient.svg",
  "/images/card-backs/quilted.svg",
  "/images/card-backs/hollowed-boxes.svg",
  "/images/card-backs/slanted-gradient.svg",
];

const createCard = (index, value) => {
  // Outer container
  const flipCard = Object.assign(document.createElement("div"), {
    className: "flip-card",
    onclick: () => rotate(index, value),
  });
  // Inner container
  const flipCardInner = Object.assign(document.createElement("div"), {
    className: "flip-card-inner",
  });
  // Front
  const flipCardFront = Object.assign(document.createElement("div"), {
    className: "flip-card-front",
    // innerHTML: "F",
    style: `background-image: url(${cardBacks[5]})`,
  });
  // Back
  const flipCardBack = Object.assign(document.createElement("div"), {
    className: "flip-card-back",
    innerHTML: value,
    // innerHTML: "B",
  });
  // Append front and back
  flipCardInner.append(flipCardFront);
  flipCardInner.append(flipCardBack);
  // Append inner
  flipCard.append(flipCardInner);
  //  return card
  return flipCard;
};
// Card values
let cardsArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

// The Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

shuffleArray(cardsArray);

for (let i = 0; i < cardsArray.length; i++) {
  board.append(createCard(i, cardsArray[i]));
}

const cardsList = document.querySelectorAll(".flip-card");

// Array of correct cards flipped.
// let correctCards = [];
//
let clickedCards = [];

const rotate = (card, value) => {
  cardsList[card].children[0].classList.add("rotate");
  cardsList[card].onclick = () => {};
  clickedCards.push({ card, value });
  console.log(clickedCards);
  if (clickedCards.length == 2) {
    if (clickedCards[0].value === clickedCards[1].value) {
      console.log("Correct");
      clickedCards = [];
    } else {
      resetCards();
    }
  }
};

const resetCards = () => {
  setTimeout(() => {
    for (let i = 0; i < clickedCards.length; i++) {
      cardsList[clickedCards[i].card].children[0].classList.remove("rotate");
      let card = clickedCards[i].card;
      let value = clickedCards[i].value;
      cardsList[clickedCards[i].card].onclick = () => rotate(card, value);
    }
    clickedCards = [];
  }, 500);
};
