import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const ModeName = {
  Timer: 'Timer',
  CycleTimer: 'CycleTimer',
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    mode: ModeName.CycleTimer,
  },
  reducers: {
    setMode: (state, actions: PayloadAction<{ mode: string }>) => {
      state.mode = actions.payload.mode;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;