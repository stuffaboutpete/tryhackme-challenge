import { City } from '../../entities/type/city';
import { Country } from '../../entities/type/country';
import { Hotel } from '../../entities/type/hotel';
import { SearchTermGroup } from './search-term-group';

export interface Response {
  cities: {
    count: number;
    results: Array<{
      city: City;
      searchTermGroups: SearchTermGroup[];
    }>
  };
  countries: {
    count: number;
    results: Array<{
      country: Country;
      searchTermGroups: SearchTermGroup[];
    }>
  };
  hotels: {
    count: number;
    results: Array<{
      hotel: Hotel;
      searchTermGroups: SearchTermGroup[];
    }>
  };
}
