import { configureStore } from "@reduxjs/toolkit";
import modalReducer from 'Features/modalSlice';
import timerReducer from 'Features/timerSlice';
import cycleTimerReducer from "Features/cycleTimerSlice";
import modeReducer from "Features/modeSlice";
import recordReducer from "Features/recordSlice";

const reduxStore = configureStore({
  reducer: {
    mode: modeReducer,
    modal: modalReducer,
    timer: timerReducer,
    cycleTimer: cycleTimerReducer,
    record: recordReducer,
  },
});

export default reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch;