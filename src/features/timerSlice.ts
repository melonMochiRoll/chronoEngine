import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const getProgress = (timer: ITimerInitState) => {
  return 100 - Math.floor(timer.currentTime/timer.originTime * 100)
};

interface ITimerInitState {
  originTime: number,
  currentTime: number,
};

const initialState: ITimerInitState = {
  originTime: 0,
  currentTime: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState: initialState,
  reducers: {
    initTime: (state, action: PayloadAction<{ time: number }>) => {
      state.originTime = action.payload.time;
      state.currentTime = action.payload.time;
    },
    setTime: (state, action: PayloadAction<{ current: number }>) => {
      state.currentTime = action.payload.current;
    },
    resetTime: (state) => {
      state.currentTime = state.originTime;
    },
  },
});

export const { initTime, setTime, resetTime } = timerSlice.actions;
export default timerSlice.reducer;