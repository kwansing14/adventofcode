const file = Bun.file('./input.txt');
const text = await file.text();
const texts = text.split('\n');

// const symbolsCoords = [];
const isSymbol = (digit: string | undefined) => {
  if (digit === undefined) {
    // console.log('is undefined:', digit);
    return false;
  }
  if (!Number(digit) && digit !== '.' && digit !== '0') {
    console.log('is symbol:', digit);
    return true;
  }
  return false;
};

const isNumber = (digit: string) => {
  if (digit === '0') return true;
  return !!Number(digit);
};

const checkSurroundingForSymbols = (
  digit: string,
  i: number,
  j: number,
  texts: string[]
) => {
  // i is row
  // j is column
  // upper row
  if (i - 1 >= 0) {
    const res1 = isSymbol(texts[i - 1][j - 1]);
    const res2 = isSymbol(texts[i - 1][j]);
    const res3 = isSymbol(texts[i - 1][j + 1]);
    if (res1 || res2 || res3) {
      return true;
    }
  }
  // middle row
  const res4 = isSymbol(texts[i][j - 1]);
  const res5 = isSymbol(texts[i][j + 1]);
  if (res4 || res5) {
    return true;
  }
  // bottom row
  if (i + 1 < texts.length) {
    const res6 = isSymbol(texts[i + 1][j - 1]);
    const res7 = isSymbol(texts[i + 1][j]);
    const res8 = isSymbol(texts[i + 1][j + 1]);
    if (res6 || res7 || res8) {
      return true;
    }
  }
  return false;
};

let ans = 0;

for (let i = 0; i < texts.length; i++) {
  const horizontal = texts[i];
  let currentNumber = '';
  let validNum = false;

  for (let j = 0; j < horizontal.length; j++) {
    const digit = horizontal[j];
    const isNumberRes = isNumber(digit);

    if (isNumberRes && validNum === false) {
      const hasSymbol = checkSurroundingForSymbols(digit, i, j, texts);
      // console.log(hasSymbol, digit, i, j);
      if (hasSymbol) validNum = hasSymbol;
    }

    if (isNumber(digit)) {
      currentNumber += digit; // adding the strings of number
    }

    // my god fuck these edges cases
    // if 345^234 << make sure detect the symbol too
    // if ...*123 make sure detect end of numbers at the end of line
    if (digit === '.' || isSymbol(digit) || j === horizontal.length - 1) {
      if (validNum) {
        validNum = false;
        console.log('valid number', ans, '+', currentNumber);
        ans += Number(currentNumber);
        console.log('equal ->', ans);
      }
      currentNumber = '';
    }
  }
}

// console.log(checkSurroundingForSymbols('1', 1, 11, texts));

console.log('answer: ', ans);
