import { City } from '../../entities/type/city';
import { Country } from '../../entities/type/country';
import { Hotel } from '../../entities/type/hotel';
import { AbortCallback } from '../../search/type/abort-callback';
import { SearchResult } from '../../search/type/search-result';

export interface State {
  searchTerm: string;
  searchResults?: {
    hotels: SearchResult<Hotel>[];
    countries: SearchResult<Country>[];
    cities: SearchResult<City>[];
  };
  searchRequestActive: false | AbortCallback;
}
