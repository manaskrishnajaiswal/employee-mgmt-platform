import axios from "axios";

import {
  SINGLE_USER_GET_FAIL,
  SINGLE_USER_GET_REQUEST,
  SINGLE_USER_GET_SUCCESS,
  SINGLE_USER_UPDATE_FAIL,
  SINGLE_USER_UPDATE_REQUEST,
  SINGLE_USER_UPDATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
} from "../constants/userConstants";

// create custom data to DB
export const postuserdatacreate = (outputFormData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users", outputFormData, config);
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get custom data from DB
export const getuserdataget = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/users", config);
    dispatch({
      type: USER_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete custom data from DB
export const deleteuserdatadelete = (customDeleteId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/dbcustom/${customDeleteId}`,
      config
    );
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get custom data from DB
export const getusersingledataget = (customGetId) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_USER_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/dbcustom/${customGetId}`, config);
    dispatch({
      type: SINGLE_USER_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: SINGLE_USER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get custom data from DB
export const putusersingledataupdate =
  (customPutId, customDataUpdate) => async (dispatch) => {
    try {
      dispatch({
        type: SINGLE_USER_UPDATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/dbcustom/${customPutId}`,
        customDataUpdate,
        config
      );
      dispatch({
        type: SINGLE_USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: SINGLE_USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
