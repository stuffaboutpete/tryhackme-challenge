/**
 * This should be doing a lot more...
 *
 * If I repeat the same search again,
 * there is no need to do any request.
 *
 * If I do a different search, I want
 * to be able to infer some information
 * and then replace with a request,
 * for example:
 *
 * If I search Fran and then Franc I
 * should be able to infer that France
 * is sticking around.
 *
 * I can also infer that the Franc
 * results are a subset of Fran -
 * therefore no request is needed.
 *
 * If I search Germa and then Germ
 * then I know need to do a request
 * (unless I did Germa earlier).
 * However everything in the Germa
 * search is still useful, just maybe
 * not the best.
 */

import { expect, test } from 'vitest'
import { AllSearchResults } from '../search/type/all-search-results';
import { Cache } from './type/cache';
import { get } from './get';
import { set } from './set';

test('returns undefined when cache is empty', () => {
  const emptyCache: Cache = {};

  expect(get('example', emptyCache)).toEqual(undefined);
});

test('returns exact results when key is identical', () => {
  const emptyCache: Cache = {};

  const searchResults: AllSearchResults = {
    hotels: [],
    countries: [],
    cities: [{ entity: { _id: 'abc', name: 'example' }, searchTermGroups: [] }]
  };

  const newCache = set(searchResults, 'example', emptyCache);

  expect(get('example', newCache)).toEqual(searchResults);
});
