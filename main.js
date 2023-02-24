const board = document.getElementById("board");

let arr = [];
let score = 0;

// resetCards = () => {
//   arr = [];
// };

const addToArr = (item) => {
  console.log("Clicked item", arr[item]);
  if (arr.length === 0) {
    arr.push(item);
  } else if (arr.length === 1) {
    arr.push(item);
    if (arr[0] === arr[1]) {
      // Keep cards from flipping
      alert("Correct");
      resetCards();
      score++;
    } else {
      alert("incorrect");
      resetCards();
    }
  }
  console.log(arr);
};

// const cards = document.querySelectorAll(".flip-card");

// cards.forEach((card) =>
//   card.addEventListener("click", () => {
//     // alert("hello");
//     // card.classList.add("rotate");
//     card.children[0].classList.add("rotate");
//   })
// );

const stuff = (iter) => {
  cards[iter].children[0].classList.add("rotate");
  console.log(cards);

  if (arr.length === 0) {
    arr.push(cardArr[iter]);
    // clickedCards.push(cards[iter]) //
  } else if (arr.length === 1) {
    arr.push(cardArr[iter]);
    if (arr[0] === arr[1]) {
      // Keep cards from flipping
      resetCards();
      score++;
      console.log("Correct");
    } else {
      console.log("Incorrect");
      resetCards();
    }
  }
};

// for (let i = 0; i < cardArr.length; i++) {
//   let card = Object.assign(document.createElement("button"), {
//     onclick: () => addToArr(cardArr[i]),
//     innerHTML: cardArr[i],
//   });
//   board.append(card);
// }

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
    innerHTML: "B",
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
const cardsArray = [1, 1, 2, 2, 3, 3];

for (let i = 0; i < 6; i++) {
  board.append(createCard(i, cardsArray[i]));
}

const cards = document.querySelectorAll(".flip-card");

// Array of correct cards flipped.
let correctCards = [];
//
let clickedCards = [];

const rotate = (card, value) => {
  cards[card].children[0].classList.add("rotate");
  clickedCards.push({ card, value });
  // console.log(cards, "cards");
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
      cards[clickedCards[i].card].children[0].classList.remove("rotate");
    }
    clickedCards = [];
  }, 500);
  console.log(clickedCards);
};
