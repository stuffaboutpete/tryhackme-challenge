import { HighlightGroup } from './type/highlight-group';
import { allGroupsOfLetters } from './all-groups-of-letters';

type T = (targetString: string, searchTerm: string) => HighlightGroup[];

export const highlightResult: T = allGroupsOfLetters;
