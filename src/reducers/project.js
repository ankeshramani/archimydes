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
} from "../actions/constant";

const project = (
  state = {
    isFetching: false,
    isSavingProject: false,
    isUpdatingProject: false,
    data: [],
    projectSavedData: {},
    projectInfo: {},
  },
  action,
) => {
  switch (action.type) {
    case GET_PROJECT_LIST_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_PROJECT_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.projectList,
      });
    case GET_PROJECT_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case GET_PROJECT_DETAILS_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_PROJECT_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        projectInfo: action.projectInfoResponse,
      });
    case GET_PROJECT_DETAILS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SAVE_PROJECT_START:
      return Object.assign({}, state, {
        isSavingProject: true,
      });
    case SAVE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isSavingProject: false,
        projectSavedData: action.saveResponse,
      });
    case SAVE_PROJECT_ERROR:
      return Object.assign({}, state, {
        isSavingProject: false,
      });
    case UPDATE_PROJECT_START:
      return Object.assign({}, state, {
        isUpdatingProject: true,
      });
    case UPDATE_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        isUpdatingProject: false,
        projectSavedData: action.updateResponse,
      });
    case UPDATE_PROJECT_ERROR:
      return Object.assign({}, state, {
        isUpdatingProject: false,
      });
    case CLEAR_PROJECT_DATA:
      return Object.assign({}, state, {
        projectSavedData: {},
      });
    case SET_PROJECT_DATA:
      return Object.assign({}, state, {
        projectSavedData: action.projectDetails,
      });
    default:
      return state;
  }
};

export default project;
