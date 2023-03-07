import axios from "axios";
import {
  CUSTOM_DATA_CREATE_FAIL,
  CUSTOM_DATA_CREATE_REQUEST,
  CUSTOM_DATA_CREATE_SUCCESS,
  CUSTOM_DATA_DELETE_FAIL,
  CUSTOM_DATA_DELETE_REQUEST,
  CUSTOM_DATA_DELETE_SUCCESS,
  CUSTOM_DATA_GET_FAIL,
  CUSTOM_DATA_GET_REQUEST,
  CUSTOM_DATA_GET_SUCCESS,
} from "../constants/customConstants";

// create custom data to DB
export const postcustomdatacreate = (outputFormData) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOM_DATA_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/dbcustom", outputFormData, config);
    dispatch({
      type: CUSTOM_DATA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: CUSTOM_DATA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get custom data from DB
export const getcustomdataget = () => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOM_DATA_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/dbcustom", config);
    dispatch({
      type: CUSTOM_DATA_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: CUSTOM_DATA_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete custom data from DB
export const deletecustomdatadelete = (customDeleteId) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOM_DATA_DELETE_REQUEST,
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
      type: CUSTOM_DATA_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: CUSTOM_DATA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
