import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    name: '',
    isOpen: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.name = action.payload.name;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;