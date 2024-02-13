import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    code: -1,
  },
  reducers: {
    openModal: (state, action: PayloadAction<{ code: number }>) => {
      state.code = action.payload.code;
    },
    closeModal: (state) => {
      state.code = -1;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalSlice.actions;
export default modalSlice.reducer;