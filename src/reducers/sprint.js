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
  GET_ONE_SPRINT_LIST_ERROR,
  GET_ONE_SPRINT_LIST_START,
  GET_ONE_SPRINT_LIST_SUCCESS,
  GET_SPRINT_DETAILS_START,
  GET_SPRINT_DETAILS_SUCCESS,
  GET_SPRINT_DETAILS_ERROR,
  SET_SPRINT_DATA,
} from "../actions/constant";

const sprint = (
  state = {
    isFetching: false,
    isSavingSprint: false,
    isUpdatingSprint: false,
    sprintSavedData: {},
    data: [],
    sprintInfo: {},
    getSprintList:[]
  },
  action,
) => {
  switch (action.type) {
    case GET_ALL_SPRINT_LIST_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_ALL_SPRINT_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.sprintList,
      });
    case GET_ALL_SPRINT_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SAVE_SPRINT_START:
      return Object.assign({}, state, {
        isSavingSprint: true,
      });
    case SAVE_SPRINT_SUCCESS:
      return Object.assign({}, state, {
        isSavingSprint: false,
        sprintSavedData: action.saveResponse,
      });
    case SAVE_SPRINT_ERROR:
      return Object.assign({}, state, {
        isSavingSprint: false,
      });
    case UPDATE_SPRINT_START:
      return Object.assign({}, state, {
        isUpdatingSprint: true,
      });
    case UPDATE_SPRINT_SUCCESS:
      return Object.assign({}, state, {
        isUpdatingSprint: false,
        sprintSavedData: action.updateResponse,
      });
    case UPDATE_SPRINT_ERROR:
      return Object.assign({}, state, {
        isUpdatingSprint: false,
      });
    case CLEAR_SPRINT_DATA:
      return Object.assign({}, state, {
        sprintSavedData: {},
      });
    case GET_SPRINT_DETAILS_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_SPRINT_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        sprintInfo: action.sprintInfoResponse,
      });
    case GET_SPRINT_DETAILS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SET_SPRINT_DATA:
      return Object.assign({}, state, {
        sprintSavedData: action.sprintDetailsInfo,
      });
    case GET_ONE_SPRINT_LIST_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_ONE_SPRINT_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        getSprintList: action.sprintList,
      });
    case GET_ONE_SPRINT_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
};

export default sprint;
