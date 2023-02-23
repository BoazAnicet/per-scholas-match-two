const board = document.getElementById("board");

let arr = [];
let score = 0;

resetCards = () => {
  arr = [];
};

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

const cards = document.querySelectorAll(".flip-card");

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

// let cardArr = [1, 1, 2, 2, 3, 3];
// for (let i = 0; i < cards.length; i++) {
//   cards[i].addEventListener("click", () => {
//     cards[i].children[0].classList.add("rotate");
//     console.log(cards[i]);

//     // if (arr.length === 0) {
//     //   arr.push(cardArr[i]);
//     //   // clickedCards.push(cards[i]) //
//     // } else if (arr.length === 1) {
//     //   arr.push(cardArr[i]);
//     //   if (arr[0] === arr[1]) {
//     //     // Keep cards from flipping
//     //     resetCards();
//     //     score++;
//     //     console.log("Correct");
//     //   } else {
//     //     console.log("Incorrect");
//     //     resetCards();
//     //   }
//     // }
//     cards[i].removeEventListener("click", () => {});
//   });
// }

// Array of correct cards flipped.
const correctCards = [];
//
const clickedCards = [];

// for (let i = 0; i < cardArr.length; i++) {
//   let card = Object.assign(document.createElement("button"), {
//     onclick: () => addToArr(cardArr[i]),
//     innerHTML: cardArr[i],
//   });
//   board.append(card);
// }

const createCard = () => {
  // Outer container
  const flipCard = Object.assign(document.createElement("div"), {
    className: "flip-card",
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

  flipCardInner.append(flipCardFront);
  flipCardInner.append(flipCardBack);

  flipCard.append(flipCardInner);
  return flipCard;
};

// const board = document.getElementById('board')

for (let i = 0; i < 6; i++) {
  board.append(createCard());
}
