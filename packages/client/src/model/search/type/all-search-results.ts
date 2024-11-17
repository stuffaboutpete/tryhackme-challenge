import { SearchResult } from './search-result';
import { City } from '../../entities/type/city';
import { Country } from '../../entities/type/country';
import { Hotel } from '../../entities/type/hotel';

export interface AllSearchResults {
  cities: Array<SearchResult<City>>;
  countries: Array<SearchResult<Country>>;
  hotels: Array<SearchResult<Hotel>>;
}
