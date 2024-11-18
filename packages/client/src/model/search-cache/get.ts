import { AllSearchResults } from '../search/type/all-search-results';
import { Cache } from './type/cache';

type T = (key: string, cache: Cache) => undefined | AllSearchResults;

export const get: T = (key, cache) => {
  return cache[key];
};
