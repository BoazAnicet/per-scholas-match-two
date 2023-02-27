let arr = [];
let player_one_score = 0;
let player_two_score = 0;
let moves = 0;
const updateMoves = () => {
  moves++;
  document.getElementById("moves").innerHTML = `Moves: ${moves}`;
};
let game_mode = "one";
let canClickCards = true;
let grid = { length: 4, width: 3 };

let cardsList;

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

// The Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const resetGame = () => {
  board.innerHTML = "";
  cardsArray = [];
  renderCards();
  cardsList = document.querySelectorAll(".flip-card");
  moves = 0;
  document.getElementById("moves").innerHTML = `Moves: ${moves}`;
};

const setGrid = (length, width) => {
  grid.length = length;
  grid.width = width;
  // board.style = `grid-template-columns: repeat(${4}, 1fr); grid-template-rows: repeat(${3}, 1fr);`;
  // board.style = `grid-template-columns: repeat(${length}, 1fr);`;
  board.style = `grid-template-columns: repeat(${length}, 100px); grid-template-rows: repeat(${width}, 100px);`;
  resetGame();
};
const board = document.getElementById("board");
// setGrid(grid.length, grid.width);

//////////////////

// Card values
let cardsArray = [];
const renderCards = () => {
  for (let i = 0; i < decks[0].deck.length - 4; i++) {
    cardsArray.push(i);
    cardsArray.push(i);
  }

  shuffleArray(cardsArray);

  for (let i = 0; i < cardsArray.length; i++) {
    board.append(
      createCard(i, cardsArray[i], decks[0].deck[cardsArray[i]].image)
    );
  }
};

renderCards();

cardsList = document.querySelectorAll(".flip-card");

// Array of correct cards flipped.
// let correctCards = [];
//
let clickedCards = [];

const rotate = (index, value) => {
  if (clickedCards.length === 2) {
    if (clickedCards[0].value !== clickedCards[1].value) {
      resetCards();
      if (game_mode === "one") {
        updateMoves();
      }
    }
  }
  cardsList[index].children[0].classList.add("rotate");
  cardsList[index].onclick = () => {};
  clickedCards.push({ index, value });
  if (clickedCards.length == 2) {
    // Both flipped cards match
    if (clickedCards[0].value === clickedCards[1].value) {
      clickedCards = [];
      if (game_mode === "one") {
        updateMoves();
      }
    }
  }
};

const resetCards = () => {
  for (let i = 0; i < clickedCards.length; i++) {
    cardsList[clickedCards[i].index].children[0].classList.remove("rotate");
    let index = clickedCards[i].index;
    let value = clickedCards[i].value;
    cardsList[clickedCards[i].index].onclick = () => rotate(index, value);
  }
  clickedCards = [];
};
