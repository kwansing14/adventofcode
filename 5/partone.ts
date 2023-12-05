const file = Bun.file("./example.txt");
const text = await file.text();
const texts = text.split("\n\n");

console.log(
  "\n-----------------------------------------------------------------\n\n"
);

// console.log(texts);

const seeds = texts[0].split(" ").slice(1);
// console.log("sss", seeds);

console.log(texts);
// const firstSeed = seeds.split(" ")[0];

const seed1 = seeds[0];
const map1 = texts[1];

// console.log(map1.split("\n"));

const firstRange = map1.split("\n")[1];
console.log(firstRange);
