import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getItem } from "Utils/localStorage";
import { CYCLE_SAVE_DATA } from "./recordSlice";

export const isNthCount = (number: number, n: number) => {
  if (!n) {
    return false;
  }
  return number % n === 0 ? true : false;
};

export const getProgress = (cycleTimer: ICycleTimerInitState) => {
  const {
    originTime,
    currentTime,
  } = cycleTimer;

  if (currentTime.mode === OriginTimeMode.Work) {
    return 100 - Math.floor(currentTime.current / originTime.work.origin * 100);
  } 

  if (currentTime.mode === OriginTimeMode.NthRest) {
    return 100 - Math.floor(currentTime.current / originTime.nthRest.origin * 100);
  }

  return 100 - Math.floor(currentTime.current / originTime.rest.origin * 100);
};

export const enum OriginTimeMode {
  Work = 'Work',
  Rest = 'Rest',
  NthRest = 'NthRest',
};

export interface ITimeFormat {
  mode: OriginTimeMode,
  origin: number,
  current: number,
};

export interface IOriginTime {
  work: { mode: OriginTimeMode.Work, origin: number, current: number },
  rest: { mode: OriginTimeMode.Rest, origin: number, current: number },
  nthRest: { mode: OriginTimeMode.NthRest, origin: number, current: number },
};

export interface ICycleTimerInitState {
  originTime: IOriginTime;
  currentTime: ITimeFormat;
  nthRestInterval: number;
  cycleCount: number;
};

const savedata = getItem(CYCLE_SAVE_DATA);

const initialState: ICycleTimerInitState = savedata ||
  {
    originTime: {
      work: { mode: OriginTimeMode.Work, origin: 0, current: 0 },
      rest: { mode: OriginTimeMode.Rest, origin: 0, current: 0 },
      nthRest: { mode: OriginTimeMode.NthRest, origin: 0, current: 0 },
    },
    currentTime: { mode: OriginTimeMode.Work, origin: 0, current: 0 },
    nthRestInterval: 0,
    cycleCount: 1,
  };

type TInitCyclePayload = {
  workTime: number,
  restTime: number,
  nthRestTime: number,
  nthRestInterval: number,
};

export const cycleTimerSlice = createSlice({
  name: 'cycleTimer',
  initialState: initialState,
  reducers: {
    initCycle: (state, action: PayloadAction<TInitCyclePayload>) => {
      const {
        workTime,
        restTime,
        nthRestTime,
        nthRestInterval,
      } = action.payload;

      const newOriginTime: IOriginTime = {
        work: { mode: OriginTimeMode.Work, origin: workTime, current: workTime },
        rest: { mode: OriginTimeMode.Rest, origin: restTime, current: restTime },
        nthRest: { mode: OriginTimeMode.NthRest, origin: nthRestTime, current: nthRestTime },
      };
      
      state.originTime = newOriginTime;
      state.currentTime = { ...newOriginTime.work };
      state.nthRestInterval = nthRestInterval;
      state.cycleCount = 1;
    },
    setTime: (state, action: PayloadAction<{ current: number }>) => {
      state.currentTime = {
        ...state.currentTime,
        current: action.payload.current,
      };
    },
    getNextTime: (state) => {
      const {
        originTime,
        currentTime,
        nthRestInterval,
        cycleCount,
      } = state;

      if (
        currentTime.mode === OriginTimeMode.Rest ||
        currentTime.mode === OriginTimeMode.NthRest
        ) {
        state.currentTime = { ...originTime.work };
        state.cycleCount = cycleCount + 1;
        return;
      }

      if (isNthCount(cycleCount, nthRestInterval)) {
        state.currentTime = { ...originTime.nthRest };
        return;
      }

      state.currentTime = { ...originTime.rest };
    },
    resetTime: (state) => {
      const { currentTime } = state;

      state.currentTime = { ...currentTime, current: currentTime.origin };
    },
    clearCycleCount: (state) => {
      state.cycleCount = 1;
    },
  },
});

export const {
  initCycle,
  setTime,
  getNextTime,
  resetTime,
  clearCycleCount,
} = cycleTimerSlice.actions;
export default cycleTimerSlice.reducer;