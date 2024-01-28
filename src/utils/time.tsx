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