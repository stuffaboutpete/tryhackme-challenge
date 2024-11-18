import { produce } from 'immer';
import { Payload } from './type/action';
import { Reduce } from './type/reduce';
import { set as setToCache } from '../search-cache/set';

export const reduce: Reduce = (currentState, action, payload) => produce(currentState, state => {
  if (action === 'SEARCH_TERM_CHANGE') {
    state.searchTerm = payload as Payload<'SEARCH_TERM_CHANGE'>;
  }

  if (action === 'SEARCH_TERM_CHANGE' && payload as Payload<'SEARCH_TERM_CHANGE'> === '') {
    state.searchResults = undefined;
  }

  if (action === 'SEARCH_REQUEST_BEGIN') {
    state.dataRequestActive = payload as Payload<'SEARCH_REQUEST_BEGIN'>;
  }

  if (action === 'SEARCH_REQUEST_SUCCESS') {
    const { searchResults, searchTerm } = payload as Payload<'SEARCH_REQUEST_SUCCESS'>;
    state.searchResults = searchResults;
    state.searchCache = setToCache(searchResults, searchTerm, state.searchCache);
    state.dataRequestActive = false;
  }

  if (action === 'SEARCH_CACHE_HIT') {
    state.searchResults = payload as Payload<'SEARCH_CACHE_HIT'>;
  }

  if (action === 'HOTEL_REQUEST_BEGIN') {
    state.dataRequestActive = payload as Payload<'HOTEL_REQUEST_BEGIN'>;
  }

  if (action === 'HOTEL_REQUEST_SUCCESS') {
    state.loadedEntity = payload as Payload<'HOTEL_REQUEST_SUCCESS'>;
    state.dataRequestActive = false;
  }

  if (action === 'COUNTRY_REQUEST_BEGIN') {
    state.dataRequestActive = payload as Payload<'COUNTRY_REQUEST_BEGIN'>;
  }

  if (action === 'COUNTRY_REQUEST_SUCCESS') {
    state.loadedEntity = payload as Payload<'COUNTRY_REQUEST_SUCCESS'>;
    state.dataRequestActive = false;
  }

  if (action === 'CITY_REQUEST_BEGIN') {
    state.dataRequestActive = payload as Payload<'CITY_REQUEST_BEGIN'>;
  }

  if (action === 'CITY_REQUEST_SUCCESS') {
    state.loadedEntity = payload as Payload<'CITY_REQUEST_SUCCESS'>;
    state.dataRequestActive = false;
  }

  if (action === 'CLEAR_SEARCH_RESULTS') {
    state.searchResults = undefined;
    state.searchTerm = '';
  }
});
