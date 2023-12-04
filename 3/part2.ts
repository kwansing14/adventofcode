const file = Bun.file('./input.txt');
const text = await file.text();
const texts = text.split('\n');

// const symbolsCoords = [];

const isAsterisk = (digit: string | undefined) => {
  if (digit === '*') return true;
  return false;
};
const isSymbol = (digit: string | undefined) => {
  if (digit === undefined) {
    // console.log('is undefined:', digit);
    return false;
  }
  if (!Number(digit) && digit !== '.' && digit !== '0') {
    // console.log('is symbol:', digit);
    return true;
  }
  return false;
};

const isNumber = (digit: string) => {
  if (digit === '0') return true;
  return !!Number(digit);
};

const findFullNumbers = (i: number, j: number, texts: string[]) => {
  // console.log('finding full numbers');
  // check left
  let num = texts[i][j];
  if (isNumber(texts[i][j - 1])) {
    num = texts[i][j - 1] + num;
    if (isNumber(texts[i][j - 2])) {
      num = texts[i][j - 2] + num;
    }
  }

  if (isNumber(texts[i][j + 1])) {
    num = num + texts[i][j + 1];
    if (isNumber(texts[i][j + 2])) {
      num = num + texts[i][j + 2];
    }
  }

  return num;
};

const checkSurroundingForNumbers = (
  digit: string,
  i: number,
  j: number,
  texts: string[]
) => {
  const coords: { i: number; j: number }[] = [];
  // up
  if (i - 1 >= 0) {
    let sameNumber = false; // detect if multiple numbers are next to each other
    const res1 = isNumber(texts[i - 1][j - 1]);
    if (res1) {
      coords.push({ i: i - 1, j: j - 1 });
      sameNumber = true;
    }
    const res2 = isNumber(texts[i - 1][j]);
    if (res2 && !sameNumber) {
      coords.push({ i: i - 1, j: j });
      sameNumber = true;
    }
    if (res2 && sameNumber) {
      sameNumber = true;
    }
    if (!res2) {
      sameNumber = false;
    }
    const res3 = isNumber(texts[i - 1][j + 1]);
    if (res3 && !sameNumber) coords.push({ i: i - 1, j: j + 1 });
  }
  // left
  const res4 = isNumber(texts[i][j - 1]);
  if (res4) coords.push({ i: i, j: j - 1 });
  // right
  const res5 = isNumber(texts[i][j + 1]);
  if (res5) coords.push({ i: i, j: j + 1 });
  // down
  if (i + 1 < texts.length) {
    let sameNumber = false; // detect if multiple numbers are next to each other
    const res6 = isNumber(texts[i + 1][j - 1]);
    if (res6) {
      coords.push({ i: i + 1, j: j - 1 });
      sameNumber = true;
    }
    const res7 = isNumber(texts[i + 1][j]);
    if (res7 && !sameNumber) {
      coords.push({ i: i + 1, j: j });
      sameNumber = true;
    }
    if (res7 && sameNumber) {
      sameNumber = true;
    }
    if (!res7) {
      sameNumber = false;
    }
    const res8 = isNumber(texts[i + 1][j + 1]);
    if (res8 && !sameNumber) coords.push({ i: i + 1, j: j + 1 });
  }
  return coords;
};

let ans = 0;
let numbersCoords = [];

for (let i = 0; i < texts.length; i++) {
  const horizontal = texts[i];
  let currentNumber = '';
  let validNum = false;

  for (let j = 0; j < horizontal.length; j++) {
    const digit = horizontal[j];
    const isAsteriskRes = isAsterisk(digit);
    if (isAsteriskRes) {
      const res = checkSurroundingForNumbers(digit, i, j, texts);
      if (res.length > 1) {
        numbersCoords.push(res);
      }
    }
  }
}

for (let i = 0; i < numbersCoords.length; i++) {
  // console.log(numbersCoords[i]);
  let gearMultiplication = 1;
  for (let j = 0; j < numbersCoords[i].length; j++) {
    const singleCoord = numbersCoords[i][j];
    const res = findFullNumbers(singleCoord.i, singleCoord.j, texts);
    gearMultiplication = gearMultiplication * Number(res);
    console.log(i, res);
  }
  ans += gearMultiplication;
}

console.log('answer: ', ans);
