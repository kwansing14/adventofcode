import { readTxt } from "../common/utils";

enum cardTypes {
  "fiveofakind",
  "fourofakind",
  "fullhouse",
  "threeofakind",
  "twopair",
  "onepair",
  "highcard",
}

const getCardType = (cards: string) => {
  /**
   * Special handle if has 2 pairs
   */
  let count = 0;
  const haveTwo2 = (v: number) => {
    if (v === 2) count += 1;
    if (count === 2) return true;
  };

  const cardObj: { [key: string]: number } = {};

  for (const card of cards) {
    cardObj[card] ? (cardObj[card] += 1) : (cardObj[card] = 1);
  }
  const res = Object.values(cardObj);

  if (res.includes(5)) {
    return cardTypes.fiveofakind;
  }
  if (res.includes(4)) {
    return cardTypes.fourofakind;
  }
  if (res.includes(3) && res.includes(2)) {
    return cardTypes.fullhouse;
  }
  if (res.includes(3)) {
    return cardTypes.threeofakind;
  }
  if (res.some(haveTwo2)) {
    return cardTypes.twopair;
  }
  if (res.includes(2)) {
    return cardTypes.onepair;
  }
  return cardTypes.highcard;
};

const checkCard = (cards1: string, cards2: string) => {
  const res1 = getCardType(cards1);
  const res2 = getCardType(cards2);

  console.log(cards1, cardTypes[res1], cards2, cardTypes[res2], res1 > res2);
  if (res1 > res2) {
    return true;
  }
  return false;
};

// Creating the bblSort function
const bblSortForCard = (arr: string[]) => {
  for (let i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      const card = arr[i].split(" ")[0];
      const nextCard = arr[i + 1].split(" ")[0];
      const isCardOnTheRightStronger = checkCard(card, nextCard);

      if (!isCardOnTheRightStronger) {
        console.log("swap", card, "with", nextCard, !isCardOnTheRightStronger);
        console.log("j", j, arr);
        // If the condition is true
        // then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        console.log("j", j + 1, arr);
      }
      // console.log(arr);
    }
  }
  // Print the sorted array
  console.log(arr);
};

const main = async (url: string) => {
  let ans = 0;
  const texts = await readTxt(url);
  // console.log(texts);
  bblSortForCard(texts);
  // for (let i = 0; i < texts.length - 1; i++) {
  //   const card = texts[i].split(" ")[0];
  //   const nextCard = texts[i + 1].split(" ")[0];
  //   const amt = texts[i].split(" ")[1];

  //   // const res = getCardType(card);

  //   const isCardOnTheRightStronger = checkCard(card, nextCard);
  //   console.log("yes", isCardOnTheRightStronger);

  //   // console.log("cardtype: ", card, "-", cardTypes[res]);
  // }

  // const res = getCardType(card);
  // console.log("cardtype: ", res);
  return ans;
};

console.log("start");
const ans = await main("./example.txt");
// console.log("ans:", ans);
