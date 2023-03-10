import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
  deleteUserReducer,
  toggleChangeReducer,
  updateUserReducer,
} from "../reducers/userReducers";

const initialState = {
  client: { toggleForm: false, formId: undefined, deleteId: null },
};

export const ReducerSlice = createSlice({
  name: "crudapp",
  initialState,
  reducers: {
    toggleChangeAction: toggleChangeReducer,
    updateAction: updateUserReducer,
    deleteAction: deleteUserReducer,
  },
});

// console.log(ReducerSlice.reducer);
export const { toggleChangeAction, updateAction, deleteAction } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;
