import { it, expect, describe } from 'vitest';
import { isArrayOf, range, segmentize, shuffle } from './index.js';

describe('isArrayOf', () => {
  it('should throw an error when the source is not an array', () => {
    expect(() => isArrayOf('Hello' as unknown as Array<string>, 'string')).toThrow();
  });

  it('should throw an error when the condition is not a string or a function', () => {
    expect(() => isArrayOf([], 1 as unknown as string)).toThrow();
  });

  it.each([
    [[], 'string', true],
    [['hello'], 'string', true],
    [[1, 2, 5], 'number', true],
    [[1, 2, '', 5], 'number', false],
    [[() => '', () => 2, () => 5], 'function', true],
    [[() => '', [], () => 2, () => 5], 'function', false],
  ])('should check each element of the array (%s<%s>) => (%s)', (object, condition, expected) => {
    expect(isArrayOf(object, condition)).toBe(expected);
  });
});

describe('range', () => {
  it.each([
    [0, 0, []],
    [0, 2, [0, 1]],
    [10, 5, [10, 9, 8, 7, 6]],
    [5, 10, [5, 6, 7, 8, 9]],
  ])('should create the correct array of numbers : %s %s => %s', (start, end, expected) => {
    expect(range(start, end)).toStrictEqual(expected);
  });
});

describe('segmentize', () => {
  it.each([
    [[1, 2, 3], 1, [[1], [2], [3]]],
    [[1, 2, 3], 2, [[1, 2], [3]]],
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      2,
      [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      3,
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8],
      ],
    ],
    [[1, 2, 3, 4, 5, 6, 7, 8], 10, [[1, 2, 3, 4, 5, 6, 7, 8]]],
    [[], 10, []],
  ])('should segmentize array', (array, length, result) => {
    expect(segmentize(array, length)).toStrictEqual(result);
  });
});

describe('shuffle', () => {
  it('should keep elements', () => {
    const initial = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const shuffled = shuffle(initial);

    expect(shuffled.length).toBe(9);

    initial.forEach(n => {
      expect(shuffled.includes(n)).toBe(true);
    });
  });
});
