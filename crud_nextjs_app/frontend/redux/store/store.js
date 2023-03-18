import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const bindMiddlware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducers = combineReducers({});

export const store = createStore(reducers, bindMiddlware([thunkMiddleware]));
