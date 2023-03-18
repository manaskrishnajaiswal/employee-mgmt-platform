import axios from "axios";
import {
  EMPLOYEES_GET_FAIL,
  EMPLOYEES_GET_REQUEST,
  EMPLOYEES_GET_SUCCESS,
} from "../constants/employeeConstants";

// GET /api/employee -> Get all employee in the company
export const employeesGetAction = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEES_GET_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/employee", config);
    dispatch({
      type: EMPLOYEES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: EMPLOYEES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
