import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    name: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.name = action.payload.name;
    },
    closeModal: (state) => {
      state.name = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;