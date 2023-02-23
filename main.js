/**
 * Match 2/Memory Game
 * One player or two player
 * Can be scored by or turn based.
 * Players take turns flipping over cards.
 * If the two cards match, the player goes again.
 * If not, the other player get a change.
 * The game ends when all cards are flipped.
 */

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
      score++;
    } else {
      alert("incorrect");
      resetCards();
    }
  }
  console.log(arr);
};

let cardArr = [1, 3, 3, 1];

for (let i = 0; i < cardArr.length; i++) {
  let card = Object.assign(document.createElement("button"), {
    onclick: () => addToArr(i),
    innerHTML: cardArr[i],
  });
  board.append(card);
}
