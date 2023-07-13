const isFunction = (o: unknown): boolean => typeof o === 'function';

/**
 * Checks if each element of the array fullfil the provided condition.
 * @param array target
 * @param condition Javascript type string or a function
 */
export const isArrayOf = (
  array: Array<unknown>,
  condition: string | ((item: unknown) => boolean)
): boolean => {
  if (!Array.isArray(array))
    throw `[Utils] Unexpected Input : expected an array but got "${typeof array}".`;

  if (!isFunction(condition) && typeof condition !== 'string')
    throw `[Utils] Unexpected Input : expected a function or a javascript type string but got "${condition}".`;

  return array.every(item => {
    if (typeof condition === 'string') {
      return typeof item === condition;
    }

    return condition(item);
  });
};

/**
 * generate an array containing the numbers in `start..end` or `end..start` if ``start`` > ``end``.
 * @param start starting number.
 * @param end ending number.
 */
export const range = (start: number, end: number): Array<number> => {
  const down = start > end;

  const output: Array<number> = [];

  for (let i = start; down ? i > end : i < end; down ? i-- : i++) {
    output.push(i);
  }

  return output;
};

/**
 * Divide an array into `segments` (smaller arrays).
 * @param array source
 * @param length segment length
 */
export const segmentize = <T = unknown>(array: Array<T>, length: number): Array<Array<T>> => {
  const output: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i += length) {
    output.push(array.slice(i, i + length));
  }

  return output;
};

/**
 * Create a new shuffled array from the input.
 * @param input initial array
 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export const shuffle = <T>(input: Array<T>): Array<T> => {
  let currentIndex = input.length,
    randomIndex;

  const array = input;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export type Arrayable<T> = T | Array<T>;
