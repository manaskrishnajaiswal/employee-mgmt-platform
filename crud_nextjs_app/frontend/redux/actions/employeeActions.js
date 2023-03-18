import axios from "axios";
import {
  EMPLOYEES_GET_FAIL,
  EMPLOYEES_GET_REQUEST,
  EMPLOYEES_GET_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
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

// POST /api/employee -> Post/add employee in the company
export const employeeCreateAction = (outputFormData) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/employee", outputFormData, config);
    dispatch({
      type: EMPLOYEE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
