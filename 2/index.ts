const file = Bun.file('./input.txt');
const text = await file.text();
const texts = text.split('\n');

const limit = { red: 12, green: 13, blue: 14 };

let ans = 0;
let ans2 = 0;

const partOneQuiz = (number: string, color: string) => {
  if (
    (color === 'red' && Number(number) > limit.red) ||
    (color === 'green' && Number(number) > limit.green) ||
    (color === 'blue' && Number(number) > limit.blue)
  ) {
    return true;
  }
  return false;
};

const partTwoQuiz = (
  number: string,
  color: string,
  newLimit: { red: number; green: number; blue: number }
) => {
  if (
    (color === 'red' && Number(number) > newLimit.red) ||
    (color === 'green' && Number(number) > newLimit.green) ||
    (color === 'blue' && Number(number) > newLimit.blue)
  ) {
    return { number, color } as {
      number: string;
      color: 'red' | 'green' | 'blue';
    };
  }
};

/**
 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 * Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
 * Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
 * Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
 * Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
 */
for (let i = 0; i < texts.length; i++) {
  const game = texts[i];
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const eachSets = game.slice(8);
  const eachSet = eachSets.split(';');

  // for part 2 quiz
  const part2Limit = { red: 0, green: 0, blue: 0 };
  let hasExceededLimit = false;

  for (let j = 0; j < eachSet.length; j++) {
    // example of 1 set: 3 blue, 4 red;
    const set = eachSet[j];
    const numColor = set.trim().split(',');

    for (let k = 0; k < numColor.length; k++) {
      // numColor =  3 blue
      const [number, color] = numColor[k].trim().split(' ');

      /**
       * PART ONE QUIZ LOGICS
       */
      const limitReached = partOneQuiz(number, color);
      if (limitReached) hasExceededLimit = true;
      /**
       * PART TWO QUIZ LOGICS
       */
      const res = partTwoQuiz(number, color, part2Limit);
      if (res?.color) {
        part2Limit[res.color] = Number(res?.number);
      }
    }

    if (j === eachSet.length - 1) {
      // adding all id that has not exceeded limit
      if (!hasExceededLimit) ans += i + 1;
    }
  }
  const total = part2Limit.red * part2Limit.green * part2Limit.blue;
  ans2 += total;
}
console.log(ans);
console.log(ans2);
