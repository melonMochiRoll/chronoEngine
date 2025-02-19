
export type TLocalStorageItem = {
  item: any,
  expirationDate: string,
};

export const LOCAL_STORAGE_EXPIRATION_DATE = { // 단위: 일
  CYCLE_TIMER_RECORD: 28,
} as const;

export type TLocalStorageExpirationDate = typeof LOCAL_STORAGE_EXPIRATION_DATE[keyof typeof LOCAL_STORAGE_EXPIRATION_DATE];