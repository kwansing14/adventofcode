import { readTxt } from '../common/utils';

enum cardLetters {
  'A' = 14,
  'K' = 13,
  'Q' = 12,
  'T' = 10,
  'J' = 1, // J is joker or 1 now
}

enum cardTypes {
  'fiveofakind',
  'fourofakind',
  'fullhouse',
  'threeofakind',
  'twopair',
  'onepair',
  'highcard',
}

const getCardType = (cards: string) => {
  /**
   * Special handle if has 2 pairs
   */
  let count = 0;
  const haveTwo2 = (v: number, i: number, obj: number[]) => {
    if (v === 2) count += 1;
    if (count === 2) return true;
  };

  const cardObj: { [key: string]: number } = {};

  for (const card of cards) {
    cardObj[card] ? (cardObj[card] += 1) : (cardObj[card] = 1);
  }
  const numberOfJ = cardObj['J'];
  cardObj.J = 0;
  const res = Object.values(cardObj);

  // remove J after reading

  // console.log(JSON.stringify(cardObj), numberOfJ);
  // console.log(res);clea

  if (res.includes(5)) {
    return cardTypes.fiveofakind;
  }
  if (res.includes(4)) {
    if (numberOfJ === 1) return cardTypes.fiveofakind;
    return cardTypes.fourofakind;
  }
  if (res.includes(3) && res.includes(2)) {
    return cardTypes.fullhouse;
  }
  if (res.includes(3)) {
    if (numberOfJ === 2) return cardTypes.fiveofakind;
    if (numberOfJ === 1) return cardTypes.fourofakind;
    return cardTypes.threeofakind;
  }
  if (res.some(haveTwo2)) {
    if (numberOfJ === 1) return cardTypes.fullhouse;
    return cardTypes.twopair;
  }
  if (res.includes(2)) {
    if (numberOfJ === 3) return cardTypes.fiveofakind;
    if (numberOfJ === 2) return cardTypes.fourofakind;
    if (numberOfJ === 1) return cardTypes.threeofakind;
    return cardTypes.onepair;
  }
  if (numberOfJ === 5) return cardTypes.fiveofakind;
  if (numberOfJ === 4) return cardTypes.fiveofakind;
  if (numberOfJ === 3) return cardTypes.fourofakind;
  if (numberOfJ === 2) return cardTypes.threeofakind;
  if (numberOfJ === 1) return cardTypes.onepair;
  return cardTypes.highcard;
};

const sameCardType = (cards1: string, cards2: string) => {
  for (let i = 0; i < 5; i++) {
    const a = cards1[i] as keyof typeof cardLetters;
    const b = cards2[i] as keyof typeof cardLetters;
    if (Number(a) && Number(b)) {
      if (Number(a) !== Number(b)) {
        return Number(a) > Number(b);
      }
    }
    if (!Number(a) && Number(b)) {
      if (typeof a === 'string') {
        return cardLetters[a] > Number(b);
      }
    }
    if (Number(a) && !Number(b)) {
      if (Number(a) !== cardLetters[b]) {
        return Number(a) > cardLetters[b];
      }
    }
    if (!Number(a) && !Number(b)) {
      if (cardLetters[a] !== cardLetters[b]) {
        return cardLetters[a] > cardLetters[b];
      }
    }
  }
  return false;
};

const checkCard = (cards1: string, cards2: string) => {
  const res1 = getCardType(cards1);
  const res2 = getCardType(cards2);
  // console.log(cards1, cardTypes[res1]);

  if (res1 === res2) return sameCardType(cards1, cards2);
  if (res1 < res2) return true;
  return false;
};

const countAmount = (arr: string[]) => {
  let multiplier = 1;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const amt = arr[i].split(' ')[1];
    sum += Number(amt) * multiplier;
    multiplier++;
  }
  // console.log(sum);
  return sum;
};

const main = async (url: string) => {
  let ans = 0;

  const arr = await readTxt(url);
  // start of bubble sorting of cards
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const card = arr[j].split(' ')[0];
      const nextCard = arr[j + 1].split(' ')[0];
      const isCardOnTheRightStronger = checkCard(card, nextCard);

      if (isCardOnTheRightStronger) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    console.log('i', i, arr.length);
  }
  // console.log(arr);
  ans = countAmount(arr);
  return ans;
};

console.log('start');
const ans = await main('./input.txt');
console.log('ans:', ans);

// too low: 249629860
// too low: 250984624
