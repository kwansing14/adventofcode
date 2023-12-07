const file = Bun.file("./example.txt");
const text = await file.text();
const texts = text.split("\n\n");

console.log(texts);
