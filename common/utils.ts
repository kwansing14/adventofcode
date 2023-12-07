export const readTxt = async (url: string) => {
  const file = Bun.file(url);
  const text = await file.text();
  const texts = text.split("\n");
  return texts;
};

export const removeUndefinedFromArray = (arr: string[]) => {
  return arr.filter((v) => v !== "");
};
