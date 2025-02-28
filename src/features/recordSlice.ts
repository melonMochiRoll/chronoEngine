import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getItem, getLength, getRecords, setRecord } from "Utils/localStorage";

export const CYCLE_SAVE_DATA = 'CE_cycle_save_data';
export const RECORD_STARTSWITH = 'CE_record_';
export const RECORD_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const RECORD_LAST_ID = 'CE_record_last_id';

export interface IHms {
  hour: number,
  minute: number,
  second: number,
};

export interface IRecord {
  cycle: number;
  mode: string;
  elapsedTime: IHms;
  completionTime: string;
};

const initialState: IRecord[] = [];

export const recordSlice = createSlice({
  name: 'record',
  initialState: {
    records: initialState,
    lastCursor: 0,
  },
  reducers: {
    saveRecord: (state, actions: PayloadAction<IRecord>) => {
      const record = actions.payload;
      const rest = state.records;
      setRecord(record);
      
      state.records = [ record, ...rest ];
      state.lastCursor = state.lastCursor + 1;
    },
    loadRecords: (state, actions: PayloadAction<any>) => {
      const { records, lastCursor } = actions.payload;
      state.records = records;
      state.lastCursor = lastCursor;
    },
    clearState: (state) => {
      state.records = [];
      state.lastCursor = 0;
    },
  },
});

export const {
  saveRecord,
  loadRecords,
  clearState,
} = recordSlice.actions;
export default recordSlice.reducer;

export const fetchRecords = (dispatch: Dispatch) => {
  const lastId = Number(getItem(RECORD_LAST_ID)) || getLength();
  dispatch(loadRecords(getRecords(lastId)));
};