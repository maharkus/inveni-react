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