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

const decks = [
  {
    name: "Minecraft",
    deck: [
      { image: "/images/decks/minecraft/apple.png" },
      { image: "/images/decks/minecraft/bow.png" },
      { image: "/images/decks/minecraft/bread.png" },
      { image: "/images/decks/minecraft/bucket.png" },
      { image: "/images/decks/minecraft/diamond_ore.png" },
      { image: "/images/decks/minecraft/diamond_sword.png" },
      { image: "/images/decks/minecraft/dirt.png" },
      { image: "/images/decks/minecraft/emerald.png" },
      { image: "/images/decks/minecraft/fishing_rod.png" },
      { image: "/images/decks/minecraft/stone_axe.png" },
      { image: "/images/decks/minecraft/stone_pickaxe.png" },
      { image: "/images/decks/minecraft/stone_shovel.png" },
    ],
  },
];

const createCard = (index, value, image) => {
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
    style: `background-image: url(${cardBacks[4]})`,
  });

  // Back
  const flipCardBack = Object.assign(document.createElement("div"), {
    className: "flip-card-back",
    // innerHTML: value,
    // innerHTML: "B",
  });
  // Back image
  const flipCardBackImage = Object.assign(document.createElement("img"), {
    // className: "flip-card-back",
    // innerHTML: value,
    src: `${image}`,
    // innerHTML: "B",
  });
  // Append Image
  flipCardBack.append(flipCardBackImage);
  // Append front and back
  flipCardInner.append(flipCardFront);
  flipCardInner.append(flipCardBack);
  // Append inner
  flipCard.append(flipCardInner);
  //  return card
  return flipCard;
};
// Card values
// let cardsArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

let cardsArray = [];
for (let i = 0; i < decks[0].deck.length - 4; i++) {
  // index, value
  cardsArray.push(i);
  cardsArray.push(i);
  // cardsArray.push(decks[0].deck[i]);
  // cardsArray.push(decks[0].deck[i]);
  // cardsArray.push(i);
}

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
  board.append(
    createCard(i, cardsArray[i], decks[0].deck[cardsArray[i]].image)
  );
  // board.append(createCard(i, cardsArray[i]));
  // board.append(createCard(i, cardsArray[i]) );
}

const cardsList = document.querySelectorAll(".flip-card");

// Array of correct cards flipped.
// let correctCards = [];
//
let clickedCards = [];

const rotate = (index, value) => {
  cardsList[index].children[0].classList.add("rotate");
  cardsList[index].onclick = () => {};
  clickedCards.push({ index, value });
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
// const rotate = (card, value) => {
//   cardsList[card].children[0].classList.add("rotate");
//   cardsList[card].onclick = () => {};
//   clickedCards.push({ card, value });
//   console.log(clickedCards);
//   if (clickedCards.length == 2) {
//     if (clickedCards[0].value === clickedCards[1].value) {
//       console.log("Correct");
//       clickedCards = [];
//     } else {
//       resetCards();
//     }
//   }
// };

const resetCards = () => {
  setTimeout(() => {
    for (let i = 0; i < clickedCards.length; i++) {
      cardsList[clickedCards[i].index].children[0].classList.remove("rotate");
      let index = clickedCards[i].index;
      let value = clickedCards[i].value;
      cardsList[clickedCards[i].index].onclick = () => rotate(index, value);
    }
    clickedCards = [];
  }, 500);
};
// const resetCards = () => {
//   setTimeout(() => {
//     for (let i = 0; i < clickedCards.length; i++) {
//       cardsList[clickedCards[i].card].children[0].classList.remove("rotate");
//       let card = clickedCards[i].card;
//       let value = clickedCards[i].value;
//       cardsList[clickedCards[i].card].onclick = () => rotate(card, value);
//     }
//     clickedCards = [];
//   }, 500);
// };

const resetGame = () => {};
