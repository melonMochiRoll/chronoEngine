export const getCookie = (key: string) => {
  if (
    document.cookie?.length < 1 ||
    !document.cookie.includes(key)
    ) {
    return '';
  }

  const value =
    document.cookie
      .split(' ')
      .reduce((acc: Array<string>, item: string) => {
        if (item.includes(key)) {
          const [key, value] = item.split('=');
          acc.push(value);
        }
        return acc;
      }, []);
      
  return value[0];
};

export const setCookie = (
  key: string,
  value: string | number | boolean,
  maxAge: number,
  ) => {
  document.cookie = `${key}=${value}; max-age=${maxAge}`;
};