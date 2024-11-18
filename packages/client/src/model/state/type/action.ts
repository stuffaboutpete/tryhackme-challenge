import { City } from '../../entities/type/city';
import { Country } from '../../entities/type/country';
import { Hotel } from '../../entities/type/hotel';
import { AbortCallback } from '../../fetch/type/abort-callback';
import { AllSearchResults } from '../../search/type/all-search-results';

export interface ActionPayloadMap {
  INIT: undefined;
  SEARCH_TERM_CHANGE: string;
  SEARCH_REQUEST_BEGIN: AbortCallback;
  SEARCH_REQUEST_SUCCESS: AllSearchResults;
  HOTEL_REQUEST_BEGIN: AbortCallback;
  HOTEL_REQUEST_SUCCESS: Hotel;
  COUNTRY_REQUEST_BEGIN: AbortCallback;
  COUNTRY_REQUEST_SUCCESS: Country;
  CITY_REQUEST_BEGIN: AbortCallback;
  CITY_REQUEST_SUCCESS: City;
  CLEAR_SEARCH_RESULTS: undefined;
}

export type Payload<A extends Action> = ActionPayloadMap[A];

export type Action = keyof ActionPayloadMap;
