import { customColors } from "../styles/styles";

export const getLengthOfLongestWord = (name: string) => {
  const roomNameWords = name.split(' ');
  const longestWord = roomNameWords.reduce((longest, currentWord) => {
    return currentWord.length > longest.length ? currentWord : longest;
  }, "");
  return longestWord.length;
};
  
export const getFontSize = (name: string) => {
  const lengthOfLongestWord = getLengthOfLongestWord(name);
  if (lengthOfLongestWord > 20) {
    return 9;
  }
  if ((lengthOfLongestWord >= 20 && lengthOfLongestWord >= 10) || name.length > 20) {
    return 10;
  } else {
    return 12;
  }
};

export function getPressedColor(color) {
  switch (color) {
    case customColors.orange:
      return customColors.orangePressed;
    case customColors.yellow:
      return customColors.yellowPressed;
    case customColors.purple:
      return customColors.purplePressed;
    case customColors.uwu:
      return customColors.uwuPressed;
    case customColors.green:
      return customColors.greenPressed;
    case customColors.softPurple:
      return customColors.softPurplePressed;
    default:
      return customColors.orangePressed;
  }
}