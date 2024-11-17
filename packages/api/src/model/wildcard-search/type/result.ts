import { Document } from 'mongodb';
import { HighlightGroup } from './highlight-group';

export interface Result {
  [entity: string]: Document;
  searchTermGroups: HighlightGroup[];
};
