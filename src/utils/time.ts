/**
 * 
 * @param second 2 = 2 second, 60 = 1 minute
 * @returns // return { hour, minute, second }
 */

export const toHMS = (second: number) => {
  const hour = Math.floor(second / 3600);
  second = Math.floor(second % 3600);

  const minute = Math.floor(second / 60);
  second = Math.floor(second % 60);

  return {
    hour,
    minute,
    second,
  };
};

/**
 * 
 * @param number
 * @returns returns digital clock format
 */
export const displayHMS = (number: string | number) => {
  if (typeof number === 'string' && number.length > 2) return number;
  if (typeof number === 'number' && number > 99) return number;

  if (typeof number === 'number') {
    number = `${number}`;
  }

  return number.length === 1 ? `0${number}` : number;
};