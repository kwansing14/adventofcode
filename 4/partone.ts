const file = Bun.file("./input.txt");
const text = await file.text();
const texts = text.split("\n");

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

const howManyPoints = (v: number) => {
  if (v > 0) return 1 * 2 ** (v - 1);
  return 0;
};

let ans = 0;

for (let i = 0; i < texts.length; i++) {
  const [winningNumbers, matchingNumbers] = texts[i].split("|");

  const wNum = winningNumbers.slice(8).trim().split(" ");
  const mNum = matchingNumbers.trim().split(" ");
  const res = howManyMatchingNumbers(wNum, mNum);
  const res2 = howManyPoints(res);
  ans += res2;
}

console.log("ans:", ans);
