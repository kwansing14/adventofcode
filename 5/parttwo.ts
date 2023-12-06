const file = Bun.file('./example.txt');
const text = await file.text();
const texts = text.split('\n\n');

const numMatch = (
  range: { lower: number; higher: number; link: number },
  seed: number
) => {
  // console.log('matching--', seed, range.lower, range.higher, range.link);
  if (seed >= range.lower && seed <= range.higher) {
    const diff = range.link - range.lower;
    // console.log('seed in range:', seed, diff);
    return seed + diff;
  }
};

const getRange = (range: string) => {
  const res1 = range.split(' ');
  const lower = Number(res1[1]);
  const higher = Number(res1[1]) + (Number(res1[2]) - 1);
  return { lower, higher, link: Number(res1[0]) };
};

const getNumbersFromMap = (maps: string, seed: number) => {
  const map = maps.split('\n').slice(1);
  let defaultNum = 0;
  for (let i = 0; i < map.length; i++) {
    const range = getRange(map[i]);
    const res = numMatch(range, seed);
    defaultNum = res || defaultNum;
  }
  return defaultNum ? defaultNum : seed;
};

const getLocation = (seed: number) => {
  let correspondingValue = seed;
  for (let i = 1; i < texts.length; i++) {
    // console.log('v: ', correspondingValue);
    // console.log(texts[i]);
    const res = getNumbersFromMap(texts[i], correspondingValue);
    correspondingValue = res;
    // console.log('location: ', correspondingValue);
  }
  return correspondingValue;
};

const checkEachSeedsInPairs = (seedNum: string, seedRange: string) => {
  let ans = 0;
  for (let i = 0; i < Number(seedRange); i++) {
    const location = getLocation(Number(seedNum) + i);
    console.log(
      'check seed number ->',
      Number(seedNum) + i,
      i,
      Number(seedRange)
    );
    if (ans === 0) ans = location;
    if (ans > location) ans = location;
  }
  return ans;
};

// const start = () => {
//   const seeds = texts[0].split(' ').slice(1);
//   // console.log(seeds);
//   let ans = 0;
//   for (let i = 0; i < seeds.length; i += 2) {
//     // console.log('i--', i);
//     const res = checkEachSeedsInPairs(seeds[i], seeds[i + 1]);
//     // console.log('---', res);
//     if (ans === 0) ans = res;
//     if (ans > res) ans = res;
//   }
//   console.log('ans: ', ans);
// };
// start();
const res = checkEachSeedsInPairs('79', '14');
console.log('res', res);
