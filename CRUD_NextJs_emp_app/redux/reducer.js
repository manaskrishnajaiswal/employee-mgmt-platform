import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
  columnTypeReducer,
  deleteUserReducer,
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
  },
});

// console.log(ReducerSlice.reducer);
export const {
  toggleChangeAction,
  updateAction,
  deleteAction,
  columnTypeAction,
} = ReducerSlice.actions;

export default ReducerSlice.reducer;
