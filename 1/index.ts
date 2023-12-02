const file = Bun.file('./input.txt');
const text = await file.text();
const texts = text.split('\n');

let sum = 0;
/**
 * PART ONE
 */
// for (let i = 0; i < texts.length; i++) {
//   texts[i] = texts[i].replace(/[^\d]/g, '');
//   const firstNumber = Number(texts[i].at(0)) || 0;
//   const secondNumber = Number(texts[i].at(-1)) || 0;
//   const total = firstNumber * 10 + secondNumber;
//   sum += total;
// }

// console.log(sum);

const stringToNum = (str: string) => {
  if (str === 'one') return 1;
  if (str === 'two') return 2;
  if (str === 'three') return 3;
  if (str === 'four') return 4;
  if (str === 'five') return 5;
  if (str === 'six') return 6;
  if (str === 'seven') return 7;
  if (str === 'eight') return 8;
  if (str === 'nine') return 9;
};

const possibleStrings = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];
/**
 * PART TWO
 * two1nine
 * eightwothree
 * abcone2threexyz
 * xtwone3four
 * 4nineeightseven2
 * zoneight234
 * 7pqrstsixteen
 */

const getNumber = (numOrString: string | number) => {
  if (Number(numOrString)) {
    return Number(numOrString);
  }
  if (typeof numOrString === 'string') {
    return stringToNum(numOrString);
  }
};

function getFirstAndLastKey(obj: any) {
  const keys = Object.keys(obj);
  const lastKey = keys.at(-1) || 0;
  const firstKey = keys.at(0) || 0;
  return { first: obj[firstKey], value: obj[lastKey] };
}

let ans2 = 0;
for (let i = 0; i < texts.length; i++) {
  const object: any = {};
  for (let j = 0; j < possibleStrings.length; j++) {
    if (texts[i].includes(possibleStrings[j])) {
      const res = getNumber(possibleStrings[j]);
      const positionOfChar = texts[i].indexOf(possibleStrings[j]);
      const lastPosOfChar = texts[i].lastIndexOf(possibleStrings[j]);
      // somehow if object key are numbers, it will be auto sorted
      if (positionOfChar === lastPosOfChar) {
        object[positionOfChar] = res;
      } else {
        object[positionOfChar] = res;
        object[lastPosOfChar] = res;
      }
      // object[positionOfChar] = res;
    }
  }
  console.log(object);
  const res2 = getFirstAndLastKey(object);
  const total = res2.first * 10 + res2.value;
  ans2 += total;
}
console.log(ans2);
