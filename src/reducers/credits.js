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
} from "../actions/constant";

const userCredit = (
  state = {
    creditList: {
      'credits': {
        'total': 0,
        'reserved': 0,
        'available': 0,
      }
    },
    creditHistoryList: [],
    creditsByProjectList: [],
  },
  action,
) => {
  switch (action.type) {
    case GET_CREDIT_START:
      return Object.assign({}, state, {
      });
    case GET_CREDIT_SUCCESS:
      return Object.assign({}, state, {
        creditList: action.credits,
      });
    case GET_CREDIT_ERROR:
      return Object.assign({}, state, {
      });
    case GET_CREDIT_HISTORY_START:
      return Object.assign({}, state, {
      });
    case GET_CREDIT_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        creditHistoryList: action.creditsHistory,
      });
    case GET_CREDIT_HISTORY_ERROR:
      return Object.assign({}, state, {
      });
    case GET_CREDIT_BY_PROJECT_START:
      return Object.assign({}, state, {
      });
    case GET_CREDIT_BY_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        creditsByProjectList: action.creditsByProject,
      });
    case GET_CREDIT_BY_PROJECT_ERROR:
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
};

export default userCredit;
