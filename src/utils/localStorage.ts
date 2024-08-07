import { IRecord, RECORD_LAST_ID, RECORD_STARTSWITH } from "Features/recordSlice";

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
  try {
    if (localStorage.hasOwnProperty(key)) {
      const value = localStorage.getItem(key) as string;
      return isJSON(value) || value;
    }

    return '';
  } catch (err) {
    console.error(err);
    return '';
  }
};

export const setItem = (key: string, value: any) => {
  try {
    const item = value instanceof Object ?
    JSON.stringify(value) :
    value;

    localStorage.setItem(key, item);
  } catch (err) {
    console.error(err);
  }
};

const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
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

  try {
    setItem(recordKey, value);
    setItem(RECORD_LAST_ID, currentId);
  } catch (err) {
    removeItem(recordKey);
    setItem(RECORD_LAST_ID, lastId);
    console.error(err);
  }
};