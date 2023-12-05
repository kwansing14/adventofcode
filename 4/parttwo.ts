const file = Bun.file("./input.txt");
const text = await file.text();
const texts = text.split("\n");

let ans = 0;

// card 1, 4 match,  win card 2 3 4 5
// card 2, 2 match , win card 3 4 another 3, 4
// card 3 ,2 * 4

type typeOfCards = { [key: number]: number };

const cards: typeOfCards = {};

const howManyMatchingNumbers = (a: string[], b: string[]) => {
  const newB = b.filter(function (element) {
    return element !== "";
  });

  const newA = a.filter(function (element) {
    return element !== "";
  });

  const obj: { [key: string]: boolean } = {};

  let count = 0;

  newB.forEach((v) => {
    const included = newA.includes(v);
    if (included) count++;
    return (obj[v] = included);
  });
  return count;
};

const calculateWinnings = (cardNum: number, winningNumbers: number) => {
  console.log(cardNum, winningNumbers);

  let cardIndexCounter = 0;
  if (winningNumbers > 0) {
    cards[cardNum] = winningNumbers;
  }

  return true;
};

console.log("run---");

for (let i = 0; i < texts.length; i++) {
  const [winningNumbers, matchingNumbers] = texts[i].split("|");

  const wNum = winningNumbers.slice(8).trim().split(" ");
  const mNum = matchingNumbers.trim().split(" ");

  cards[i + 1] ? (cards[i + 1] += 1) : (cards[i + 1] = 1);

  const noMatched = howManyMatchingNumbers(wNum, mNum);

  for (let j = 0; j < noMatched; j++) {
    for (let k = 0; k < cards[i + 1]; k++) {
      if (cards[i + j + 2]) {
        cards[i + j + 2] += 1;
      } else {
        cards[i + j + 2] = 1;
      }
    }
  }
}

// adding all the values copy from google
const values = Object.values(cards);
const sum = values.reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

console.log(sum);
