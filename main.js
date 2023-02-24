const board = document.getElementById("board");

let arr = [];
let score = 0;

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
    innerHTML: "F",
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
const cardsArray = [1, 1, 2, 2, 3, 3, 4, 4];
const preShuffledCards = cardsArray.sort((a, b) => 0.5 - Math.random());

for (let i = 0; i < cardsArray.length; i++) {
  board.append(createCard(i, cardsArray[i]));
}

const cardsList = document.querySelectorAll(".flip-card");

// Array of correct cards flipped.
let correctCards = [];
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
