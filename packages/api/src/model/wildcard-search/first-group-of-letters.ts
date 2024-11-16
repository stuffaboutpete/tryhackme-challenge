import { HighlightGroup } from './type/highlight-group';

type T = (targetString: string, searchTerm: string) => HighlightGroup | undefined;

export const firstGroupOfLetters: T = (targetString, searchTerm) => {
  const searchTermLetters = searchTerm.split('');
  const startOfGroup = targetString.indexOf(searchTermLetters[0]);

  if (startOfGroup === -1) return undefined;

  for (let i = 1; i < searchTermLetters.length + 1; i++) {
    if (searchTermLetters[i] !== targetString[startOfGroup + i]) {
      return {
        text: targetString.slice(startOfGroup, startOfGroup + i),
        start: startOfGroup,
        end: startOfGroup + i
      };
    }
  }

  return {
    text: targetString.slice(startOfGroup),
    start: startOfGroup,
    end: startOfGroup + searchTermLetters.length
  };
};
