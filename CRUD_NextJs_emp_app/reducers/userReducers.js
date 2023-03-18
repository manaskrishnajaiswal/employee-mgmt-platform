import {
  SINGLE_USER_GET_FAIL,
  SINGLE_USER_GET_REQUEST,
  SINGLE_USER_GET_RESET,
  SINGLE_USER_GET_SUCCESS,
  SINGLE_USER_UPDATE_FAIL,
  SINGLE_USER_UPDATE_REQUEST,
  SINGLE_USER_UPDATE_RESET,
  SINGLE_USER_UPDATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_RESET,
  USER_GET_SUCCESS,
} from "../constants/userConstants";

export const toggleChangeReducer = (state, action) => {
  state.client.toggleForm = !state.client.toggleForm;
};

export const updateUserReducer = (state, action) => {
  state.client.formId = action.payload;
};

export const deleteUserReducer = (state, action) => {
  state.client.deleteId = action.payload;
};

export const columnTypeReducer = (state, action) => {
  state.client.columnType = action.payload;
};

export const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export const userDataCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, userdatacreate: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDataGetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return { loading: true };
    case USER_GET_SUCCESS:
      return { loading: false, userdataget: action.payload };
    case USER_GET_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const userDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        userdatadelete: action.payload,
      };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userSingleDataGetReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_USER_GET_REQUEST:
      return { loading: true };
    case SINGLE_USER_GET_SUCCESS:
      return { loading: false, usersingledataget: action.payload };
    case SINGLE_USER_GET_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_USER_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const userSingleDataUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_USER_UPDATE_REQUEST:
      return { loading: true };
    case SINGLE_USER_UPDATE_SUCCESS:
      return { loading: false, usersingledataupdate: action.payload };
    case SINGLE_USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
