import axios from "axios";
import {
  CUSTOM_DATA_CREATE_FAIL,
  CUSTOM_DATA_CREATE_REQUEST,
  CUSTOM_DATA_CREATE_SUCCESS,
} from "../constants/customConstants";

// User register
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
    const { data } = await axios.post("/api/custom", outputFormData, config);
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
