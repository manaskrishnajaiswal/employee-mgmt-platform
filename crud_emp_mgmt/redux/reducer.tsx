import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  client: { toogleForm: false },
};

export const ReducerSlice = createSlice({
  name: "crudapp",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toogleForm = !state.client.toogleForm;
    },
  },
});

export const { toggleChangeAction } = ReducerSlice.actions;

export default ReducerSlice.reducer;
