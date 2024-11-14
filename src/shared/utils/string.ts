export const formatEmail = (email: string) => email.toLocaleLowerCase().trim();

export const formatName = (value: string) => {
  const words = value.trim().toLocaleLowerCase().split(" ");

  const name: string[] = [];

  words.forEach((item) => {
    const firstLetter = item.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = item.slice(1);

    const result = firstLetterCap + remainingLetters;

    name.push(result);
  });

  return name.join(" ");
};

export const normalizeString = (text: string) => {
  const normalizedText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();

  return normalizedText;
};
