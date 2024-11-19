import { expect, test } from 'vitest'
import { Range } from './type/range';
import { segregate } from './segregate';

test('segregates a given range into contiguous ranges', () => {
  const ranges: Range[] = [
    { start: 3, end: 5 },
    { start: 8, end: 11 }
  ];

  const expectedOutput: Range[] = [
    { start: 0, end: 3 },
    { start: 3, end: 5 },
    { start: 5, end: 8 },
    { start: 8, end: 11 },
    { start: 11, end: 15 }
  ];

  expect(segregate(ranges, 15)).toEqual(expectedOutput);
});

// TODO More tests...
