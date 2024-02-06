import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getRecords, setRecord } from "Utils/localStorage";

export const RECORD_STARTSWITH = 'CE_record_';
export const RECORD_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export interface IRecord {
  cycle: number;
  mode: string;
  recordTime: Date;
};

const initialState: IRecord[] = [];

export const recordSlice = createSlice({
  name: 'record',
  initialState: {
    records: initialState,
  },
  reducers: {
    saveRecord: (state, actions: PayloadAction<IRecord>) => {
      const record = actions.payload;
      setRecord(record);
      state.records = [ ...state.records, record ];
    },
    loadRecords: (state, actions: PayloadAction<IRecord[]>) => {
      state.records = actions.payload;
    },
    clearState: (state) => {
      state.records = [];
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
  const records = getRecords();
  dispatch(loadRecords(records));
};