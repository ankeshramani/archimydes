import {
  GET_CREDIT_START,
  GET_CREDIT_SUCCESS,
  GET_CREDIT_ERROR,
  GET_CREDIT_HISTORY_START,
  GET_CREDIT_HISTORY_SUCCESS,
  GET_CREDIT_HISTORY_ERROR,
  GET_CREDIT_BY_PROJECT_START,
  GET_CREDIT_BY_PROJECT_SUCCESS,
  GET_CREDIT_BY_PROJECT_ERROR,
  RESERVE_CREDITS_START,
  RESERVE_CREDITS_SUCCESS,
  RESERVE_CREDITS_ERROR,

} from "./constant";
import { getUsersCredits, getUsersCreditsHistory,getCreditByProjectApi, reserveCreditsByUserStoryApi } from "../api/credit";


const getCreditStart = () => ({
  type: GET_CREDIT_START,
});

const getCreditSucces = json => ({
  type: GET_CREDIT_SUCCESS,
  credits: json.data,
});

const getCreditError = error => ({
  type: GET_CREDIT_ERROR,
  errorMsg: error.message
});

export const getCredit = (id) => {
  return async (dispatch) => {
    dispatch(getCreditStart());
    try {
      const response = await getUsersCredits(id);
      dispatch(getCreditSucces(response));
      return response;
    } catch (error) {
      dispatch(getCreditError(error));
      return error;
    }
  }
};

const getCreditHistoryStart = () => ({
  type: GET_CREDIT_HISTORY_START,
});

const getCreditHistorySucces = json => ({
  type: GET_CREDIT_HISTORY_SUCCESS,
  creditsHistory: json.data,
});

const getCreditHistoryError = error => ({
  type: GET_CREDIT_HISTORY_ERROR,
  errorMsg: error.message
});

export const getCreditHistory = (id) => {
  return async (dispatch) => {
    dispatch(getCreditHistoryStart());
    try {
      const response = await getUsersCreditsHistory(id);
      dispatch(getCreditHistorySucces(response));
      return response;
    } catch (error) {
      dispatch(getCreditHistoryError(error));
      return error;
    }
  }
};

const getCreditByProjectStart = () => ({
  type: GET_CREDIT_BY_PROJECT_START,
});

const getCreditByProjectSucces = json => ({
  type: GET_CREDIT_BY_PROJECT_SUCCESS,
  creditsByProject: json.data,
});

const getCreditByProjectError = error => ({
  type: GET_CREDIT_BY_PROJECT_ERROR,
  errorMsg: error.message
});

export const getCreditByProject = (id) => {
  return async (dispatch) => {
    dispatch(getCreditByProjectStart());
    try {
      const response = await getCreditByProjectApi(id);
      dispatch(getCreditByProjectSucces(response));
      return response;
    } catch (error) {
      dispatch(getCreditByProjectError(error));
      return error;
    }
  }
};

const reserveCreditsStart = () => ({
  type: RESERVE_CREDITS_START,
});

const reserveCreditsSucces = json => ({
  type: RESERVE_CREDITS_SUCCESS,
  reserveCreditsInfo: json.data,
});

const reserveCreditsError = error => ({
  type: RESERVE_CREDITS_ERROR,
  errorMsg: error.message
});

export const reserveCredits = (id, data) => {
  return async (dispatch) => {
    dispatch(reserveCreditsStart());
    try {
      const response = await reserveCreditsByUserStoryApi(id, data);
      dispatch(reserveCreditsSucces(response));
      return response;
    } catch (error) {
      dispatch(reserveCreditsError(error));
      return error;
    }
  }
};