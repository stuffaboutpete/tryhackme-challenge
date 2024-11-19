import { expect, test } from 'vitest'
import { entity } from './entity';

test('returns undefined if path is not recognised', () => {
  expect(entity('/gibberish')).toEqual(undefined);
});

test('returns hotel if path is valid', () => {
  expect(entity('/hotels/abc123')).toEqual('hotel');
});

test('returns country if path is valid', () => {
  expect(entity('/countries/abc123')).toEqual('country');
});

test('returns city if path is valid', () => {
  expect(entity('/cities/abc123')).toEqual('city');
});

// TODO More tests...
