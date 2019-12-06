import {
  GET_PROJECT_LIST_START,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_ERROR,
  SAVE_PROJECT_START,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_ERROR,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  GET_PROJECT_DETAILS_START,
  GET_PROJECT_DETAILS_SUCCESS,
  GET_PROJECT_DETAILS_ERROR,
  CLEAR_PROJECT_DATA,
  SET_PROJECT_DATA,
} from "./constant";
import { PROJECT_SAVE_SUCCESS_MSG, PROJECT_UPDATE_SUCCESS_MSG } from "../common/constants";
import { getProjectListAPI, saveProjectAPI, updateProjectAPI, getProjectAPI } from "../api/projectApi";
import { getUsersInfoAPI } from "../api/usersApi";
import { getUserData } from "../utils/common";
import _ from "lodash-es";

const requestProjectList = () => ({
  type: GET_PROJECT_LIST_START,
});

const receiveProjectListSuccess = json => ({
  type: GET_PROJECT_LIST_SUCCESS,
  projectList: json
});

const recieveProjectListError = error => ({
  type: GET_PROJECT_LIST_ERROR,
  errorMsg: error.message
});

export const getProjectList = (query='') => {
  return async (dispatch) => {
    dispatch(requestProjectList());
    try {
      const response = await getProjectListAPI(query);
      const userData = getUserData();
      if(response.data){
        if(userData.userRoles && userData.userRoles.length && userData.userRoles.includes("Admin")){
          //Get list of Owner ID
          const ownerIDArr = response.data.map(
            (val, i) => {
              if(val.owner !==null){
                return val.owner;
              }
            });

          if(ownerIDArr && ownerIDArr.length > 0){
            const ownerIDArrWithoutUndefined = _.without(ownerIDArr, undefined);
            const uniqueUsersArr = _.uniq(ownerIDArrWithoutUndefined);
            const query =  '?ids=' + uniqueUsersArr.join(',');
            const userResponse = await getUsersInfoAPI(query);

            if(userResponse.data){
              //Add users info on projects
              const newResponse = response.data.map(
                (val, i) => {
                  let userInfo = _.find(userResponse.data, { '_id': val.owner });
                  val.userInfo = userInfo;
                  return val;
                });
              dispatch(receiveProjectListSuccess(newResponse));
            }
          }else{
            dispatch(receiveProjectListSuccess(response.data));
          }
        }else{
          dispatch(receiveProjectListSuccess(response.data));
        }
      }
    } catch (error) {
      dispatch(recieveProjectListError(error));
    }
  }
};

const saveProjectStart = () => ({
  type: SAVE_PROJECT_START,
});

const saveProjectSuccess = json => ({
  type: SAVE_PROJECT_SUCCESS,
  saveResponse: json.data,
  successMsg: PROJECT_SAVE_SUCCESS_MSG
});

const saveProjectError = error => ({
  type: SAVE_PROJECT_ERROR,
  errorMsg: error.message
});

export const saveProject = (data) => {
  return async (dispatch) => {
    dispatch(saveProjectStart());
    try {
      const response = await saveProjectAPI(data);
      dispatch(saveProjectSuccess(response));
      return response;
    } catch (error) {
      dispatch(saveProjectError(error));
      return error;
    }
  }
};

const updateProjectStart = () => ({
  type: UPDATE_PROJECT_START,
});

const updateProjectSuccess = json => ({
  type: UPDATE_PROJECT_SUCCESS,
  updateResponse: json.data,
  successMsg: PROJECT_UPDATE_SUCCESS_MSG,
});

const updateProjectError = error => ({
  type: UPDATE_PROJECT_ERROR,
  errorMsg: error.message
});

export const updateProject = (data, projectId) => {
  return async (dispatch) => {
    dispatch(updateProjectStart());
    try {
      const response = await updateProjectAPI(data, projectId);
      dispatch(updateProjectSuccess(response));
      return response;
    } catch (error) {
      dispatch(updateProjectError(error));
      return error;
    }
  }
};

const getProjectDetailsStart = () => ({
  type: GET_PROJECT_DETAILS_START,
});

const getProjectDetailsSucces = json => ({
  type: GET_PROJECT_DETAILS_SUCCESS,
  projectInfoResponse: json.data,
});

const getProjectDetailsError = error => ({
  type: GET_PROJECT_DETAILS_ERROR,
  errorMsg: error.message
});

export const getProjectDetails = (projectId) => {
  return async (dispatch) => {
    dispatch(getProjectDetailsStart());
    try {
      const response = await getProjectAPI(projectId);
      dispatch(getProjectDetailsSucces(response));
      return response;
    } catch (error) {
      dispatch(getProjectDetailsError(error));
      return error;
    }
  }
};

export const clearProjectData = () => ({
  type: CLEAR_PROJECT_DATA,
});

export const setProjectData = (data) => ({
  type: SET_PROJECT_DATA,
  projectDetails: data,
});


