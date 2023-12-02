const file = Bun.file('./1/input.txt');
const text = await file.text();
const texts = text.split('\n');

let sum = 0;

for (let i = 0; i < texts.length; i++) {
  texts[i] = texts[i].replace(/[^\d]/g, '');
  const firstNumber = Number(texts[i].at(0)) || 0;
  const secondNumber = Number(texts[i].at(-1)) || 0;
  const total = firstNumber * 10 + secondNumber;
  sum += total;
}

// answer
console.log(sum);
