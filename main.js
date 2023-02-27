let arr = [];
let player_one_pairs = 0;
let player_two_pairs = 0;
let moves = 0;
let game_mode = "solo";
let canClickCards = true;
let grid = { length: 4, width: 3 };
let cardsList;
const info = document.getElementById("info");
let whosTurn = "one";
const board = document.getElementById("board");
let cardsArray = [];
let clickedCards = [];
let correctPairs = 0;

const updateMoves = () => {
  moves++;
  document.getElementById("moves").innerHTML = `Moves: ${moves}`;
};

const createSoloPlayerDiv = () => {
  const soloPlayer = Object.assign(document.createElement("div"), {
    className: "solo",
  });

  const movesDiv = Object.assign(document.createElement("div"), {
    id: "solo",
    innerHTML: `Moves: ${moves}`,
  });

  soloPlayer.append(movesDiv);

  return soloPlayer;
};

const createTwoPlayerDiv = () => {
  const twoPlayerDiv = Object.assign(document.createElement("div"), {
    className: "two-player",
  });

  const playerOne = Object.assign(document.createElement("div"), {
    className: "player-one",
  });
  whosTurn === "one" ? playerOne.classList.add("turn") : () => {};
  const playerOneTitle = Object.assign(document.createElement("h2"), {
    innerHTML: "Player 1",
  });
  const playerOnePairs = Object.assign(document.createElement("div"), {
    innerHTML: `Pairs: ${player_one_pairs}`,
  });

  const playerTwo = Object.assign(document.createElement("div"), {
    className: "player-two",
  });
  whosTurn === "two" ? playerTwo.classList.add("turn") : () => {};
  const playerTwoTitle = Object.assign(document.createElement("h2"), {
    innerHTML: "Player 2",
  });
  const playerTwoPairs = Object.assign(document.createElement("div"), {
    innerHTML: `Pairs: ${player_two_pairs}`,
  });

  playerOne.append(playerOneTitle);
  playerOne.append(playerOnePairs);

  playerTwo.append(playerTwoTitle);
  playerTwo.append(playerTwoPairs);

  twoPlayerDiv.append(playerOne);
  twoPlayerDiv.append(playerTwo);

  return twoPlayerDiv;
};

const changeGameMode = (mode) => {
  resetGame();
  info.innerHTML = "";
  switch (mode) {
    case "solo":
      game_mode = "solo";
      info.append(createSoloPlayerDiv());
      break;
    case "two":
      game_mode = "two";
      info.append(createTwoPlayerDiv());
      break;
    default:
      game_mode = "solo";
  }
};

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
  info.innerHTML = "";
  cardsArray = [];
  renderCards();
  cardsList = document.querySelectorAll(".flip-card");
  moves = 0;
  correctPairs = 0;
  whosTurn = "one";
  clickedCards = [];
  player_one_pairs = 0;
  player_two_pairs = 0;

  if (game_mode === "solo") {
    info.append(createSoloPlayerDiv());
  } else if (game_mode === "two") {
    info.append(createTwoPlayerDiv());
  }
};

const setGrid = (length, width) => {
  grid.length = length;
  grid.width = width;
  // board.style = `grid-template-columns: repeat(${4}, 1fr); grid-template-rows: repeat(${3}, 1fr);`;
  // board.style = `grid-template-columns: repeat(${length}, 1fr);`;
  board.style = `grid-template-columns: repeat(${length}, 100px); grid-template-rows: repeat(${width}, 100px);`;
  resetGame();
};

//////////////////

// Card values
const renderCards = () => {
  for (let i = 0; i < 8; i++) {
    // for (let i = 0; i < decks[0].deck.length - 4; i++) {
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

const rotate = (index, value) => {
  if (clickedCards.length === 2) {
    if (clickedCards[0].value !== clickedCards[1].value) {
      resetCards();
      if (game_mode === "solo") {
        updateMoves();
      }

      if (game_mode === "two") {
        if (whosTurn === "one") {
          whosTurn = "two";
          console.log(whosTurn);
          document.querySelector(".player-one").classList.remove("turn");
          document.querySelector(".player-two").classList.add("turn");
        } else if (whosTurn === "two") {
          whosTurn = "one";
          document.querySelector(".player-two").classList.remove("turn");
          document.querySelector(".player-one").classList.add("turn");
          console.log(whosTurn);
        }
      }
    }
  }

  cardsList[index].children[0].classList.add("rotate");
  cardsList[index].onclick = () => {};
  clickedCards.push({ index, value });

  // if (clickedCards.length === 2) {
  //   if (clickedCards[0].value !== clickedCards[1].value) {
  //     if (game_mode === "solo") {
  //       updateMoves();
  //     }

  //     if (game_mode === "two") {
  //       if (whosTurn === "one") {
  //         whosTurn = "two";
  //         console.log(whosTurn);
  //         document.querySelector(".player-one").classList.remove("turn");
  //         document.querySelector(".player-two").classList.add("turn");
  //       } else if (whosTurn === "two") {
  //         whosTurn = "one";
  //         document.querySelector(".player-two").classList.remove("turn");
  //         document.querySelector(".player-one").classList.add("turn");
  //         console.log(whosTurn);
  //       }
  //     }
  //   }
  // }

  if (clickedCards.length == 2) {
    // Both flipped cards match
    if (clickedCards[0].value === clickedCards[1].value) {
      clickedCards = [];
      if (game_mode === "solo") {
        updateMoves();
        correctPairs++;
        // if (correctPairs === 8) {
        //   setTimeout(() => {
        //     alert(`You win with ${moves} moves!`);
        //   }, 500);
        // }
      }

      if (game_mode === "two") {
        if (whosTurn === "one") {
          player_one_pairs++;
          correctPairs++;
          info.innerHTML = "";
          info.append(createTwoPlayerDiv());
        } else if (whosTurn === "two") {
          player_two_pairs++;
          correctPairs++;
          info.innerHTML = "";
          info.append(createTwoPlayerDiv());
        }
      }
    }
  }

  if (correctPairs === 8) {
    if (game_mode === "solo") {
      setTimeout(() => {
        alert(`You win with ${moves} moves!`);
      }, 500);
    }

    if (game_mode === "two") {
      if (player_one_pairs > player_two_pairs) {
        setTimeout(() => {
          alert(`Player 1 wins with ${player_one_pairs} moves!`);
        }, 500);
      } else if (player_two_pairs > player_one_pairs) {
        setTimeout(() => {
          alert(`Player 2 wins with ${player_two_pairs} moves!`);
        }, 500);
      } else if (player_one_pairs === player_two_pairs) {
        setTimeout(() => {
          alert(`Tie game with ${player_one_pairs} each!`);
        }, 500);
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
