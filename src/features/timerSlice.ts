import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    originTime: 0,
    currentTime: 0,
  },
  reducers: {
    initTime: (state, action) => {
      state.originTime = action.payload.time;
      state.currentTime = action.payload.time;
    },
    setTime: (state, action) => {
      state.currentTime = action.payload.time;
    },
    resetTime: (state) => {
      state.currentTime = state.originTime;
    },
  },
});

export const { initTime, setTime, resetTime } = timerSlice.actions;
export default timerSlice.reducer;