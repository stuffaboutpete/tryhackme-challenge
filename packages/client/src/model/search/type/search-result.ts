import { SearchTermGroup } from '../../search/type/search-term-group';

export interface SearchResult<A> {
  entity: A;
  searchTermGroups: SearchTermGroup[];
}
