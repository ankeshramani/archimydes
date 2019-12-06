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
  MOVE_USER_STORY_TO_ANOTHER_SPRINT_START,
  MOVE_USER_STORY_TO_ANOTHER_SPRINT_SUCCESS,
  MOVE_USER_STORY_TO_ANOTHER_SPRINT_ERROR,
  UPDATE_USER_STORY_START,
  UPDATE_USER_STORY_SUCCESS,
  UPDATE_USER_STORY_ERROR,
  DELETE_USER_STORY_START,
  DELETE_USER_STORY_SUCCESS,
  DELETE_USER_STORY_ERROR,
  GET_ONE_USER_STORY_START,
  GET_ONE_USER_STORY_SUCCESS,
  GET_ONE_USER_STORY_ERROR,
} from "../actions/constant";

const userStories = (
  state = {
    isFetching: false,
    isSavingUserStories: false,
    userStoriesSavedData: [],
    successCriteria: [],
    userStoriesList: [],
    isUpdateUserStories: false,
    userStoriesUpdateData: [],
  },
  action,
) => {
  switch (action.type) {
    case SAVE_USER_STORIES_START:
      return Object.assign({}, state, {
        isSavingUserStories: true,
      });
    case SAVE_USER_STORIES_SUCCESS:
      return Object.assign({}, state, {
        isSavingUserStories: false,
        userStoriesSavedData: state.userStoriesSavedData.concat(action.saveResponse),
      });
    case SAVE_USER_STORIES_ERROR:
      return Object.assign({}, state, {
        isSavingUserStories: false,
      });
    case ADD_SUCCESS_CRITERIA:
      return Object.assign({}, state, {
        successCriteria: state.successCriteria.concat(action.json),
      });
    case REMOVE_SUCCESS_CRITERIA:
      return Object.assign({}, state, {
        successCriteria: state.successCriteria.filter((item, index) => index !== action.val),
      });
    case CLEAR_SUCCESS_CRITERIA:
      return Object.assign({}, state, {
        successCriteria: [],
      });
    case CLEAR_USER_STORIES_DATA:
      return Object.assign({}, state, {
        userStoriesSavedData: [],
      });
    case GET_USER_STORIES_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_USER_STORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        userStoriesList: action.userStoriesListResponse,
      });
    case GET_USER_STORIES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SET_USER_STORIES_DATA:
      return Object.assign({}, state, {
        userStoriesSavedData: action.userStoriesList,
      });
    case MOVE_USER_STORY_TO_ANOTHER_SPRINT_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case MOVE_USER_STORY_TO_ANOTHER_SPRINT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        moveUserStoriesList: action.moveUserStoriesListResponse,
      });
    case MOVE_USER_STORY_TO_ANOTHER_SPRINT_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
       case UPDATE_USER_STORY_START:
      return Object.assign({}, state, {
        isUpdateUserStories: true,
      });
    case UPDATE_USER_STORY_SUCCESS:
      return Object.assign({}, state, {
        isUpdateUserStories: false,
        userStoriesUpdateData: state.userStoriesUpdateData.concat(action.updateResponse),
      });
    case UPDATE_USER_STORY_ERROR:
      return Object.assign({}, state, {
        isUpdateUserStories: false,
      });
    case DELETE_USER_STORY_START:
      return Object.assign({}, state, {
      });
    case DELETE_USER_STORY_SUCCESS:
      return Object.assign({}, state, {
      });
    case DELETE_USER_STORY_ERROR:
      return Object.assign({}, state, {
        userStoryDeleteError: action.errorMsg,
      });
    case GET_ONE_USER_STORY_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_ONE_USER_STORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        oneUserStoriesList: action.oneUserStoryResponse,
      });
    case GET_ONE_USER_STORY_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
};

export default userStories;
