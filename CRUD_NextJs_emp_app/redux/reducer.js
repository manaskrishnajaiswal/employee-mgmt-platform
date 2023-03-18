import { createSlice } from "@reduxjs/toolkit";
import {
  columnTypeReducer,
  deleteUserReducer,
  formReducer,
  toggleChangeReducer,
  updateUserReducer,
} from "../reducers/userReducers";

const initialState = {
  client: {
    toggleForm: false,
    formId: undefined,
    deleteId: null,
    columnType: "Number",
  },
};

export const ReducerSlice = createSlice({
  name: "crudapp",
  initialState,
  reducers: {
    toggleChangeAction: toggleChangeReducer,
    updateAction: updateUserReducer,
    deleteAction: deleteUserReducer,
    columnTypeAction: columnTypeReducer,
    formAction: formReducer,
  },
});

// console.log(ReducerSlice.reducer);
export const {
  toggleChangeAction,
  updateAction,
  deleteAction,
  columnTypeAction,
  formAction,
} = ReducerSlice.actions;
export default ReducerSlice.reducer;
