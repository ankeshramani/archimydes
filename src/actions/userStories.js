import {
  SAVE_USER_STORIES_START,
  SAVE_USER_STORIES_SUCCESS,
  SAVE_USER_STORIES_ERROR,
  ADD_SUCCESS_CRITERIA,
  REMOVE_SUCCESS_CRITERIA,
  CLEAR_SUCCESS_CRITERIA,
  CLEAR_USER_STORIES_DATA,
  GET_USER_STORIES_START,
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_ERROR,
  SET_USER_STORIES_DATA,
  UPDATE_USER_STORY_START,
  UPDATE_USER_STORY_SUCCESS,
  UPDATE_USER_STORY_ERROR,
  MOVE_USER_STORY_TO_ANOTHER_SPRINT_START,
  MOVE_USER_STORY_TO_ANOTHER_SPRINT_SUCCESS,
  MOVE_USER_STORY_TO_ANOTHER_SPRINT_ERROR,
  DELETE_USER_STORY_START,
  DELETE_USER_STORY_SUCCESS,
  DELETE_USER_STORY_ERROR,
  GET_ONE_USER_STORY_START,
  GET_ONE_USER_STORY_SUCCESS,
  GET_ONE_USER_STORY_ERROR,
  MOVE_UNSELECTED_STORIES_ANOTHER_SPRINT_ERROR,
  NOT_ENOUGH_CREDITS_ERROR,
} from "./constant";
import { saveUserStoriesAPI, getUserStoriesAPI, moveUserStoriesAPI,updateUserStoriesAPI, deleteUserStoriesAPI, getOneUserStoriesAPI } from "../api/userStoriesApi";
import {
  USER_STORIES_SAVE_SUCCESS_MSG,
  UPDATE_USER_STORIES_SAVE_SUCCESS_MSG,
  USER_STORY_MOVE_MSG,
  DELETE_USER_STORY_MSG,
  UNSELECTED_STORIES_SUBMISSION_ERROR_MSG,
  NOT_ENOUGH_CREDITS_ERROR_MSG,
} from "../common/constants";


const saveUserStoriesStart = () => ({
  type: SAVE_USER_STORIES_START,
});

const saveUserStoriesSuccess = json => ({
  type: SAVE_USER_STORIES_SUCCESS,
  saveResponse: json.data,
  successMsg: USER_STORIES_SAVE_SUCCESS_MSG
});

const saveUserStoriesError = error => ({
    type: SAVE_USER_STORIES_ERROR,
    errorMsg: error.response && error.response.data && error.response.data.errorMessage
});

export const saveUserStories = (data, projectId, sprintId) => {
  return async (dispatch) => {
    dispatch(saveUserStoriesStart());
    try {
      const response = await saveUserStoriesAPI(data, projectId, sprintId);
      dispatch(saveUserStoriesSuccess(response));
      return response;
    } catch (error) {
      dispatch(saveUserStoriesError(error));
      return error;
    }
  }
};

export const addSuccessCriteria = (json) => ({
  type: ADD_SUCCESS_CRITERIA,
  json,
});

export const removeSuccessCriteria = (val) => ({
  type: REMOVE_SUCCESS_CRITERIA,
  val,
});

export const clearSuccessCriteria = () => ({
  type: CLEAR_SUCCESS_CRITERIA,
});

export const clearUserStoriesData = () => ({
  type: CLEAR_USER_STORIES_DATA,
});

const getUserStoriesStart = () => ({
  type: GET_USER_STORIES_START,
});

const getUserStoriesSucces = json => ({
  type: GET_USER_STORIES_SUCCESS,
  userStoriesListResponse: json.data,
});

const getUserStoriesError = error => ({
  type: GET_USER_STORIES_ERROR,
  errorMsg: error.message
});

export const getUserStories = (projectId, sprintId) => {
  return async (dispatch) => {
    dispatch(getUserStoriesStart());
    try {
      const response = await getUserStoriesAPI(projectId, sprintId);
      dispatch(getUserStoriesSucces(response));
      return response;
    } catch (error) {
      dispatch(getUserStoriesError(error));
      return error;
    }
  }
};

const moveUserStoryToAnotherSprintStart = () => ({
  type: MOVE_USER_STORY_TO_ANOTHER_SPRINT_START,
});

const moveUserStoryToAnotherSprintSucces = json => ({
  type: MOVE_USER_STORY_TO_ANOTHER_SPRINT_SUCCESS,
  moveUserStoriesListResponse: json.data,
  successMsg: USER_STORY_MOVE_MSG
});

const moveUserStoryToAnotherSprintError = error => ({
  type: MOVE_USER_STORY_TO_ANOTHER_SPRINT_ERROR,
  errorMsg: error.message
});

export const moveUserStoryToAnotherSprint = (projectId, sprintId, storyId, newSprintId) => {
  return async (dispatch) => {
    dispatch(moveUserStoryToAnotherSprintStart());
    try {
      const response = await moveUserStoriesAPI(projectId, sprintId, storyId, newSprintId);
      dispatch(moveUserStoryToAnotherSprintSucces(response));
      return response;
    } catch (error) {
      dispatch(moveUserStoryToAnotherSprintError(error));
      return error;
    }
  }
};

const updateUserStoriesStart = () => ({
  type: UPDATE_USER_STORY_START,
});

const updateUserStoriesSuccess = json => ({
  type: UPDATE_USER_STORY_SUCCESS,
  updateResponse: json.data,
  successMsg: UPDATE_USER_STORIES_SAVE_SUCCESS_MSG
});

const updateUserStoriesError = error => ({
    type: UPDATE_USER_STORY_ERROR,
    errorMsg: error.response && error.response.data &&  error.response.data.errorMessage
});

export const updateUserStories = (data, projectId, sprintId, storyId) => {
  return async (dispatch) => {
    dispatch(updateUserStoriesStart());
    try {
      const response = await updateUserStoriesAPI(data, projectId, sprintId, storyId);
      dispatch(updateUserStoriesSuccess(response));
      return response;
    } catch (error) {
      dispatch(updateUserStoriesError(error));
      return error;
    }
  }
};

export const setUserStoriesData = (data) => ({
  type: SET_USER_STORIES_DATA,
  userStoriesList: data,
});


const deleteUserStoryStart = () => ({
  type: DELETE_USER_STORY_START,
});

const deleteUserStorySuccess = () => ({
  type: DELETE_USER_STORY_SUCCESS,
  successMsg: DELETE_USER_STORY_MSG
});

const deleteUserStoryError = (error) => ({
  type: DELETE_USER_STORY_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.message
});

export const deleteUserStory = (projectId, sprintId, storyId) => {
  return async (dispatch) => {
    dispatch(deleteUserStoryStart());
    try {
      const response = await deleteUserStoriesAPI(projectId, sprintId, storyId);
      dispatch(deleteUserStorySuccess(response));
      return response;
    } catch (error) {
      dispatch(deleteUserStoryError(error));
      return error;
    }
  }
};

const getOneUserStoriesStart = () => ({
  type: GET_ONE_USER_STORY_START,
});

const getOneUserStoriesSucces = json => ({
  type: GET_ONE_USER_STORY_SUCCESS,
  oneUserStoryResponse: json.data,
});

const getOneUserStoriesError = error => ({
  type: GET_ONE_USER_STORY_ERROR,
  errorMsg: error.message
});

export const getOneUserStories = (projectId, sprintId, storyId) => {
  return async (dispatch) => {
    dispatch(getOneUserStoriesStart());
    try {
      const response = await getOneUserStoriesAPI(projectId, sprintId, storyId);
      dispatch(getOneUserStoriesSucces(response));
      return response;
    } catch (error) {
      dispatch(getOneUserStoriesError(error));
      return error;
    }
  }
};
export const showErrorToMoveStoryAnotherSprint = () => ({
  type: MOVE_UNSELECTED_STORIES_ANOTHER_SPRINT_ERROR,
  errorMsg: UNSELECTED_STORIES_SUBMISSION_ERROR_MSG
});

export const showErrorForNotEnoughCredits = () => ({
  type: NOT_ENOUGH_CREDITS_ERROR,
  errorMsg: NOT_ENOUGH_CREDITS_ERROR_MSG
});
