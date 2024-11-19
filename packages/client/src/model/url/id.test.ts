import { expect, test } from 'vitest'
import { id } from './id';

test('returns undefined if path is not recognised', () => {
  expect(id('/gibberish')).toEqual(undefined);
});

test('returns hotel ID if path is valid', () => {
  expect(id('/hotels/abc123')).toEqual('abc123');
});

test('returns country ID if path is valid', () => {
  expect(id('/countries/def456')).toEqual('def456');
});

test('returns city ID if path is valid', () => {
  expect(id('/cities/ghi789')).toEqual('ghi789');
});

// TODO More tests...
