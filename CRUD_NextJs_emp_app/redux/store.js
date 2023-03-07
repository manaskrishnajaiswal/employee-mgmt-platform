import { applyMiddleware } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducer";
import listenerMiddleware from "./listener";
import {
  customDataCreateReducer,
  customDataDeleteReducer,
  customDataGetReducer,
  customSingleDataGetReducer,
  customSingleDataUpdateReducer,
} from "../reducers/customReducers";

const otherReducers = combineReducers({
  customDataCreate: customDataCreateReducer,
  customDataGet: customDataGetReducer,
  customDataDelete: customDataDeleteReducer,
  customSingleDataGet: customSingleDataGetReducer,
  customSingleDataUpdate: customSingleDataUpdateReducer,
});

export const store = configureStore({
  reducer: { app: Reducer, otherapp: otherReducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
