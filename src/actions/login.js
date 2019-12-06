import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "./constant";

import { loginAPI, logoutAPI } from "../api/usersApi";
import { LOGOUT_SUCCESS_MSG } from "../common/constants";
import { removeAllUserinfo } from "../utils/common";

const loginSuccess = response => {
  return {
    type: LOGIN_SUCCESS,
    payload: response,
  }
}

const loginError = error => {
  return {
    type: LOGIN_ERROR,
    errorMsg: error.errorMessage
  }};

export const login = (data) => {
  return async (dispatch) => {
    try {
      const response = await loginAPI(data);
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      dispatch(loginError(error.response.data));
      return error;
    }
  }
};

const logoutSuccess = response => {
  return {
    type: LOGOUT_SUCCESS,
    successMsg: LOGOUT_SUCCESS_MSG,
  }
}

const logoutError = error => {
  return {
    type: LOGOUT_ERROR,
    errorMsg: error.message
  }
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const response = await logoutAPI();
      removeAllUserinfo();
      dispatch(logoutSuccess(response));
      return response;
    } catch (error) {
      dispatch(logoutError(error));
      return error;
    }
  }
};


