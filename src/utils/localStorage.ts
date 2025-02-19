import dayjs from "dayjs";
import { IRecord, RECORD_LAST_ID, RECORD_STARTSWITH } from "Features/recordSlice";
import { TLocalStorageExpirationDate, TLocalStorageItem } from "Typings/type";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);;
dayjs.tz.setDefault(dayjs.tz.guess());

const isJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return false;
  }
};

export const getLength = () => {
  return Object.keys(localStorage).length;
};

export const getItem = (key: string) => {
  if (!localStorage.hasOwnProperty(key)) {
    return '';
  }

  const item: TLocalStorageItem = JSON.parse(localStorage.getItem(key) as string);

  return item.item;
};

export const setItem = (key: string, value?: any, expirationPeriod?: TLocalStorageExpirationDate) => {
  const result = JSON.stringify({
    item: value,
    expirationDate: dayjs.tz().add(expirationPeriod || 28, 'day').format('YYYY-MM-DD'),
  });

  localStorage.setItem(key, result);
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const getRecords = (cursor: number) => {
  const result: IRecord[] = [];
  let lastCursor = 0;

  for (let i=cursor; i>0; i--) {
    if (result.length > 9) {
      break;
    }

    lastCursor = i;
    const item = getItem(`${RECORD_STARTSWITH}${i}`);
    result.push(item);
  }

  return { records: result, lastCursor };
};

export const setRecord = (value: IRecord) => {
  const lastId = Number(getItem(RECORD_LAST_ID)) || 0;
  const currentId = lastId + 1;
  const recordKey = `${RECORD_STARTSWITH}${currentId}`;

  setItem(recordKey, value);
  setItem(RECORD_LAST_ID, currentId);
};

export const clearExpiredItem = () => {
  for (const [key, value] of Object.entries(localStorage)) {
    const target: TLocalStorageItem = JSON.parse(value);

    if (dayjs().isAfter(target.expirationDate, 'day')) {
      removeItem(key);
    }
  }
};