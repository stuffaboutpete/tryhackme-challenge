import { City } from '../../entities/type/city';
import { Country } from '../../entities/type/country';
import { Entity } from '../../entities/type/entity';
import { Hotel } from '../../entities/type/hotel';
import { AbortCallback } from '../../fetch/type/abort-callback';
import { SearchResult } from '../../search/type/search-result';

export interface State {
  searchTerm: string;
  searchResults?: {
    hotels: SearchResult<Hotel>[];
    countries: SearchResult<Country>[];
    cities: SearchResult<City>[];
  };
  loadedEntity?: Entity;
  dataRequestActive: false | AbortCallback;
}
