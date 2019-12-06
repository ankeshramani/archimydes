import {
  UPDATE_USERS_CREDITS_START,
  UPDATE_USERS_CREDITS_SUCCESS,
  UPDATE_USERS_CREDITS_ERROR,
  UPDATE_USERS_ROLE_START,
  UPDATE_USERS_ROLE_SUCCESS,
  UPDATE_USERS_ROLE_ERROR,
  DEDUCT_CREDITS_START,
  DEDUCT_CREDITS_SUCCESS,
  DEDUCT_CREDITS_ERROR

} from "./constant";
import {updateUsers, UsersCredits, UsersCreditsDeduct} from "../api/usersApi";
import {USER_UPDATE_SUCCESS_MSE} from "../common/constants";

const updateUserCreditStart = () => ({
  type: UPDATE_USERS_CREDITS_START,
});
const updateUserCreditSuccess = (data) => ({
  type: UPDATE_USERS_CREDITS_SUCCESS,
  successMsg: USER_UPDATE_SUCCESS_MSE,
  payload: data
});
const updateUserCreditError = (error) => ({
  type: UPDATE_USERS_CREDITS_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.errorMessage
});

export const updateUserCredit = (data,userId) => {
  return async (dispatch) => {
    dispatch(updateUserCreditStart());
    try {
      const response = await UsersCredits(data,userId);
      dispatch(updateUserCreditSuccess(response));
      return response;
    } catch (error) {
      dispatch(updateUserCreditError(error));
      return error;
    }
  }
};

const updateUserRoleStart = () => ({
  type: UPDATE_USERS_ROLE_START,
});
const updateUserRoleSuccess = (data) => ({
  type: UPDATE_USERS_ROLE_SUCCESS,
  successMsg: USER_UPDATE_SUCCESS_MSE,
  payload: data
});
const updateUserRoleError = (error) => ({
  type: UPDATE_USERS_ROLE_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.errorMessage
});

export const updateUserRole = (data,userId) => {
  return async (dispatch) => {
    dispatch(updateUserRoleStart());
    try {
      const response = await updateUsers(data,userId);
      dispatch(updateUserRoleSuccess(response));
      return response;
    } catch (error) {
      dispatch(updateUserRoleError(error));
      return error;
    }
  }
};

const deductCreditStart = () => ({
  type: DEDUCT_CREDITS_START,
});
const deductCreditSuccess = (data) => ({
  type: DEDUCT_CREDITS_SUCCESS,
  payload: data
});
const deductCreditError = (error) => ({
  type: DEDUCT_CREDITS_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.errorMessage
});

export const deductCredit = (data,userId) => {
  return async (dispatch) => {
    dispatch(deductCreditStart());
    try {
      const response = await UsersCreditsDeduct(data,userId);
      dispatch(deductCreditSuccess(response));
      return response;
    } catch (error) {
      dispatch(deductCreditError(error));
      return error;
    }
  }
};





