import { AllSearchResults } from '../search/type/all-search-results';
import { Cache } from './type/cache';

type T = (searchResults: AllSearchResults, key: string, cache?: Cache) => Cache;

export const set: T = (searchResults, key, cache = {}) => {
  cache = { ...cache };

  cache[key] = searchResults;

  return cache;
};
