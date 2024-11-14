export const nameMask = (text: string) => {
  if (!text) return text;

  const formattedText = text.toLowerCase().replace(/(?:^|\s)\S/g, function (letter) {
    return letter.toUpperCase();
  });

  return formattedText;
};
