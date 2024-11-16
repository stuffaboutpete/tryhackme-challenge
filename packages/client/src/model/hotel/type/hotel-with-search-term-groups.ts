import { Hotel } from './hotel';
import { SearchTermGroup } from './search-term-group';

export interface HotelWithSearchTermGroups {
    hotel: Hotel;
    searchTermGroups: SearchTermGroup[];
}
