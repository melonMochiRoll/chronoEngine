import { createSlice } from "@reduxjs/toolkit";

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
    workTime,
    restTime,
    nthRestTime,
    nthRest,
    cycleCount,
  } = cycleTimer;

  const isWorkTime = originTime.length;

  if (isWorkTime) {
    return 100 - Math.floor(currentTime / workTime * 100);
  } 

  if (isNthCount(cycleCount, nthRest)) {
    return 100 - Math.floor(currentTime / nthRestTime * 100);
  }

  return 100 - Math.floor(currentTime / restTime * 100);
};

export interface ICycleTimerInitState {
  originTime: number[];
  workTime: number;
  restTime: number;
  currentTime: number;
  nthRestTime: number;
  nthRest: number;
  cycleCount: number;
}

export const cycleTimerSlice = createSlice({
  name: 'cycleTimer',
  initialState: {
    originTime: [0, 0],
    workTime: 0,
    restTime: 0,
    currentTime: 0,
    nthRestTime: 0,
    nthRest: 0,
    cycleCount: 1,
  },
  reducers: {
    initCycle: (state, action) => {
      const {
        workTime,
        restTime,
        nthRest,
        nthRestTime
      } = action.payload;

      state.originTime = [ restTime ];
      state.workTime = workTime;
      state.restTime = restTime;
      state.currentTime = workTime;
      state.nthRestTime = nthRestTime;
      state.nthRest = nthRest;
    },
    setTime: (state, action) => {
      state.currentTime = action.payload.time;
    },
    getNextTime: (state) => {
      const {
        originTime,
        workTime,
        restTime,
        nthRest,
        nthRestTime,
        cycleCount,
      } = state;
      
      if (originTime.length < 1) {
        state.originTime = [
          isNthCount(cycleCount + 1, nthRest) ? nthRestTime : restTime,
        ];
        state.cycleCount = cycleCount + 1;
        state.currentTime = workTime;
        return;
      }

      state.currentTime = originTime.shift() as number;
    },
    resetTime: (state) => {
      const {
        originTime,
        workTime,
        restTime,
        nthRestTime,
        nthRest,
        cycleCount,
      } = state;
      const isWorkMode = !!originTime.length;

      if (isWorkMode) {
        state.currentTime = workTime;
        return;
      }

      if (isNthCount(cycleCount, nthRest)) {
        state.currentTime = nthRestTime;
        return;
      }

      state.currentTime = restTime;
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