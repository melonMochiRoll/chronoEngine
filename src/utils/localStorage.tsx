import { IRecord, RECORD_STARTSWITH } from "Features/recordSlice";
import { nanoid } from "nanoid";

const isJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e: any) {
    return false;
  }
};

export const getItem = (key: string) => {
  if (localStorage.hasOwnProperty(key)) {
    const value = localStorage.getItem(key) as string;
    return isJSON(value) || value;
  }
  
  return '';
};

export const setItem = (key: string, value: any) => {
  const item = value instanceof Object ?
    JSON.stringify(value) :
    value;

  localStorage.setItem(key, item);
};

export const clear = () => {
  localStorage.clear();
};

export const getRecords = () => {
  const records =
    Object
      .keys(localStorage)
      .filter((it: string) => it.startsWith(RECORD_STARTSWITH))
      .reduce((acc: IRecord[], key: string) => {
        const value = JSON.parse(localStorage.getItem(key) as string);
        acc.push(value);
        return acc;
      }, [])
      .sort((a: IRecord, b: IRecord) =>
        a.recordTime.valueOf() - b.recordTime.valueOf()
      );

  return records;
};

export const setRecord = (value: IRecord) => {
  const recordKey = `${RECORD_STARTSWITH}${nanoid(7)}`;
  setItem(recordKey, value);
};