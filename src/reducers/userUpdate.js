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

} from "../actions/constant";

const userUpdate = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USERS_CREDITS_START:
      return Object.assign({}, state, {
      });
    case UPDATE_USERS_CREDITS_SUCCESS:
      return Object.assign({}, state, {
        userCredits: action.payload && action.payload.data
      });
    case UPDATE_USERS_CREDITS_ERROR:
      return Object.assign({}, state, {
        errorCredit: action.errorMsg
      });
    case DEDUCT_CREDITS_START:
      return Object.assign({}, state, {
      });
    case DEDUCT_CREDITS_SUCCESS:
      return Object.assign({}, state, {
        deductCredits: action.payload && action.payload.data
      });
    case DEDUCT_CREDITS_ERROR:
      return Object.assign({}, state, {
        errorCredit: action.errorMsg
      });
    case UPDATE_USERS_ROLE_START:
      return Object.assign({}, state, {
      });
    case UPDATE_USERS_ROLE_SUCCESS:
      return Object.assign({}, state, {
        userRole: action.payload && action.payload.data
      });
    case UPDATE_USERS_ROLE_ERROR:
      return Object.assign({}, state, {
        errorCredit: action.errorMsg
      });
    default:
      return state;
  }
};

export default userUpdate;
