import { createSlice } from "@reduxjs/toolkit";

export const cycleTimerSlice = createSlice({
  name: 'cycleTimer',
  initialState: {
    originTime: [0, 0],
    workTime: 0,
    restTime: 0,
    currentTime: 0,
  },
  reducers: {
    initCycle: (state, action) => {
      const { workTime, restTime } = action.payload;
      state.originTime = [ restTime ];
      state.workTime = workTime;
      state.restTime = restTime;
      state.currentTime = workTime;
    },
    setTime: (state, action) => {
      state.currentTime = action.payload.time;
    },
    getNextTime: (state) => {
      const { originTime, workTime, restTime } = state;
      
      if (originTime.length < 1) {
        state.originTime = [ restTime ];
        state.currentTime = workTime;
        return;
      }

      state.currentTime = originTime.shift() as number;
    },
  },
});

export const {
  initCycle,
  setTime,
  getNextTime,
} = cycleTimerSlice.actions;
export default cycleTimerSlice.reducer;