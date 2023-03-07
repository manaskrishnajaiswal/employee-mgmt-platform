import {
  CUSTOM_DATA_CREATE_FAIL,
  CUSTOM_DATA_CREATE_REQUEST,
  CUSTOM_DATA_CREATE_RESET,
  CUSTOM_DATA_CREATE_SUCCESS,
  CUSTOM_DATA_GET_FAIL,
  CUSTOM_DATA_GET_REQUEST,
  CUSTOM_DATA_GET_RESET,
  CUSTOM_DATA_GET_SUCCESS,
} from "../constants/customConstants";

export const customDataCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_DATA_CREATE_REQUEST:
      return { loading: true };
    case CUSTOM_DATA_CREATE_SUCCESS:
      return { loading: false, customdatacreate: action.payload };
    case CUSTOM_DATA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOM_DATA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const customDataGetReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_DATA_GET_REQUEST:
      return { loading: true };
    case CUSTOM_DATA_GET_SUCCESS:
      return { loading: false, customdataget: action.payload };
    case CUSTOM_DATA_GET_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOM_DATA_GET_RESET:
      return {};
    default:
      return state;
  }
};
