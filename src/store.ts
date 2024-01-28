import { configureStore } from "@reduxjs/toolkit";
import modalReducer from 'Features/modalSlice';
import timerReducer from 'Features/timerSlice';

const reduxStore = configureStore({
  reducer: {
    modal: modalReducer,
    timer: timerReducer,
  },
});

export default reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch;