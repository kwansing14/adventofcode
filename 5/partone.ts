const file = Bun.file('./input.txt');
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

const getLocation = (seed: string) => {
  let correspondingValue = Number(seed);
  for (let i = 1; i < texts.length; i++) {
    const res = getNumbersFromMap(texts[i], correspondingValue);
    correspondingValue = res;
    // console.log('location: ', correspondingValue);
  }
  return correspondingValue;
};

const seeds = texts[0].split(' ').slice(1);
let ans = 0;
for (let i = 0; i < seeds.length; i++) {
  // console.log(seeds[0]);
  const location = getLocation(seeds[i]);
  console.log(location);
  if (ans === 0) ans = location;
  if (ans > location) ans = location;
}

console.log('ans: ', ans);
