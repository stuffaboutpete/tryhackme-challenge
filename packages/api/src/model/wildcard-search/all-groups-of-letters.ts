import { HighlightGroup } from './type/highlight-group';
import { firstGroupOfLetters } from './first-group-of-letters';

type T = (targetString: string, searchTerm: string) => HighlightGroup[];

export const allGroupsOfLetters: T = (targetString, searchTerm) => {
  const nextGroup = firstGroupOfLetters(targetString, searchTerm);

  if (nextGroup === undefined) return [];

  const furtherGroups = allGroupsOfLetters(
    targetString.slice(nextGroup.end),
    searchTerm.slice(nextGroup.end - nextGroup.start)
  );

  return [
    nextGroup,
    ...furtherGroups.map(group => ({
      text: group.text,
      start: group.start + nextGroup.end,
      end: group.end + nextGroup.end
    }))
  ];
};
