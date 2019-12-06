import {
  SAVE_SPRINT_START,
  SAVE_SPRINT_SUCCESS,
  SAVE_SPRINT_ERROR,
  GET_ALL_SPRINT_LIST_START,
  GET_ALL_SPRINT_LIST_SUCCESS,
  GET_ALL_SPRINT_LIST_ERROR,
  UPDATE_SPRINT_START,
  UPDATE_SPRINT_SUCCESS,
  UPDATE_SPRINT_ERROR,
  CLEAR_SPRINT_DATA,
  GET_ONE_SPRINT_LIST_START,
  GET_ONE_SPRINT_LIST_SUCCESS,
  GET_ONE_SPRINT_LIST_ERROR,
  GET_SPRINT_DETAILS_START,
  GET_SPRINT_DETAILS_SUCCESS,
  GET_SPRINT_DETAILS_ERROR,
  SET_SPRINT_DATA,
} from "./constant";
import { SPRINT_UPDATE_SUCCESS_MSG, SPRINT_SAVE_SUCCESS_MSG} from "../common/constants";
import { updateSprintAPI, getAllSprintsAPI, saveSprintAPI, getOneSprintsAPI, getSprintAPI } from "../api/sprintApi";

const saveSprintStart = () => ({
  type: SAVE_SPRINT_START,
});

const saveSprintSuccess = json => ({
  type: SAVE_SPRINT_SUCCESS,
  saveResponse: json.data,
  successMsg: SPRINT_SAVE_SUCCESS_MSG
});

const saveSprintError = error => ({
  type: SAVE_SPRINT_ERROR,
  errorMsg: error.message
});

export const saveSprint = (data,projectId) => {
  return async (dispatch) => {
    dispatch(saveSprintStart());
    try {
      const response = await saveSprintAPI(data,projectId);
      dispatch(saveSprintSuccess(response));
      return response;
    } catch (error) {
      dispatch(saveSprintError(error));
      return error;
    }
  }
};

const requestAllSprintList = () => ({
  type: GET_ALL_SPRINT_LIST_START,
});

const receiveAllSprintListSuccess = json => {
  return{
    type: GET_ALL_SPRINT_LIST_SUCCESS,
    sprintList: json
  }

};

const recieveAllSprintListError = error => ({
  type: GET_ALL_SPRINT_LIST_ERROR,
  errorMsg: error.message
});

export const getAllSprintList = (projectId, query='') => {
  return async (dispatch) => {
    dispatch(requestAllSprintList());
    try {
      const response = await getAllSprintsAPI( projectId, query);
      dispatch(receiveAllSprintListSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(recieveAllSprintListError(error));
    }
  }
};

const updateSprintStart = () => ({
  type: UPDATE_SPRINT_START,
});

const updateSprintSuccess = json => ({
  type: UPDATE_SPRINT_SUCCESS,
  updateResponse: json.data,
  successMsg: SPRINT_UPDATE_SUCCESS_MSG,
});

const updateSprintError = error => ({
  type: UPDATE_SPRINT_ERROR,
  errorMsg: error.message
});

export const updateSprint = (data, projectId, sprintId) => {
  return async (dispatch) => {
    dispatch(updateSprintStart());
    try {
      const response = await updateSprintAPI(data, projectId, sprintId);
      dispatch(updateSprintSuccess(response));
      return response;
    } catch (error) {
      dispatch(updateSprintError(error));
      return error;
    }
  }
};


const getSprintDetailsStart = () => ({
  type: GET_SPRINT_DETAILS_START,
});

const getSprintDetailsSucces = json => ({
  type: GET_SPRINT_DETAILS_SUCCESS,
  sprintInfoResponse: json.data,
});

const getSprintDetailsError = error => ({
  type: GET_SPRINT_DETAILS_ERROR,
  errorMsg: error.message
});

export const getSprintDetails = (projectId, sprintId) => {
  return async (dispatch) => {
    dispatch(getSprintDetailsStart());
    try {
      const response = await getSprintAPI(projectId, sprintId);
      dispatch(getSprintDetailsSucces(response));
      return response;
    } catch (error) {
      dispatch(getSprintDetailsError(error));
      return error;
    }
  }
};


export const clearSprintData = () => ({
  type: CLEAR_SPRINT_DATA,
})

const requestOneSprintList = () => ({
  type: GET_ONE_SPRINT_LIST_START,
});

const receiveOneSprintListSuccess = json => ({
  type: GET_ONE_SPRINT_LIST_SUCCESS,
  sprintList: json
});

export const setSprintData = (data) => ({
  type: SET_SPRINT_DATA,
  sprintDetailsInfo: data,
});


const recieveOneSprintListError = error => ({
  type: GET_ONE_SPRINT_LIST_ERROR,
  errorMsg: error.message
});

export const getOneSprintList = (projectId, sprintId) => {
  return async (dispatch) => {
    dispatch(requestOneSprintList());
    try {
      const response = await getOneSprintsAPI( projectId, sprintId);
      dispatch(receiveOneSprintListSuccess(response.data));
      return response
    } catch (error) {
      dispatch(recieveOneSprintListError(error));
    }
  }
};