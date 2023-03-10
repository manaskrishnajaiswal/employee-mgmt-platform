import {
  CUSTOM_DATA_CREATE_FAIL,
  CUSTOM_DATA_CREATE_REQUEST,
  CUSTOM_DATA_CREATE_RESET,
  CUSTOM_DATA_CREATE_SUCCESS,
  CUSTOM_DATA_DELETE_FAIL,
  CUSTOM_DATA_DELETE_REQUEST,
  CUSTOM_DATA_DELETE_RESET,
  CUSTOM_DATA_DELETE_SUCCESS,
  CUSTOM_DATA_GET_FAIL,
  CUSTOM_DATA_GET_REQUEST,
  CUSTOM_DATA_GET_RESET,
  CUSTOM_DATA_GET_SUCCESS,
  CUSTOM_SINGLE_DATA_GET_FAIL,
  CUSTOM_SINGLE_DATA_GET_REQUEST,
  CUSTOM_SINGLE_DATA_GET_RESET,
  CUSTOM_SINGLE_DATA_GET_SUCCESS,
  CUSTOM_SINGLE_DATA_UPDATE_FAIL,
  CUSTOM_SINGLE_DATA_UPDATE_REQUEST,
  CUSTOM_SINGLE_DATA_UPDATE_RESET,
  CUSTOM_SINGLE_DATA_UPDATE_SUCCESS,
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

export const customDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_DATA_DELETE_REQUEST:
      return { loading: true };
    case CUSTOM_DATA_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        customdatadelete: action.payload,
      };
    case CUSTOM_DATA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOM_DATA_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const customSingleDataGetReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_SINGLE_DATA_GET_REQUEST:
      return { loading: true };
    case CUSTOM_SINGLE_DATA_GET_SUCCESS:
      return { loading: false, customsingledataget: action.payload };
    case CUSTOM_SINGLE_DATA_GET_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOM_SINGLE_DATA_GET_RESET:
      return {};
    default:
      return state;
  }
};

export const customSingleDataUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOM_SINGLE_DATA_UPDATE_REQUEST:
      return { loading: true };
    case CUSTOM_SINGLE_DATA_UPDATE_SUCCESS:
      return { loading: false, customsingledataupdate: action.payload };
    case CUSTOM_SINGLE_DATA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOM_SINGLE_DATA_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
