import {
  SAVE_CREATE_USER_SUCCESS,
  SAVE_CREATE_USER_START,
  CREATE_USER_SAVE_ERROR,
  ADD_DISCOUNT_MANAGEMENT_START,
  ADD_DISCOUNT_MANAGEMENT_SUCCESS,
  ADD_DISCOUNT_MANAGEMENT_ERROR,
  DELETE_DISCOUNT_MANAGEMENT_START,
  DELETE_DISCOUNT_MANAGEMENT_SUCCESS,
  DELETE_DISCOUNT_MANAGEMENT_ERROR,
  APPLY_VOUCHER_START,
  APPLY_VOUCHER_SUCCESS,
  APPLY_VOUCHER_ERROR,
  PAYMENT_START,
  PAYMENT_SUCCESS,
  PAYMENT_ERROR,
} from "../actions/constant";

const discountManagement = (
  state = {
  }, action,) => {
  switch (action.type) {
    case SAVE_CREATE_USER_START:
      return Object.assign({}, state, {
      });
    case SAVE_CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        getDiscount: action.getDiscountResponse,
      });
    case CREATE_USER_SAVE_ERROR:
      return Object.assign({}, state, {
        error: action.errorMsg,
      });
    case ADD_DISCOUNT_MANAGEMENT_START:
      return Object.assign({}, state, {
      });
    case ADD_DISCOUNT_MANAGEMENT_SUCCESS:
      return Object.assign({}, state, {
        addDiscount: action.addDiscountResponse,
      });
    case ADD_DISCOUNT_MANAGEMENT_ERROR:
      return Object.assign({}, state, {
        error: action.errorMsg,
      });
    case DELETE_DISCOUNT_MANAGEMENT_START:
      return Object.assign({}, state, {
      });
    case DELETE_DISCOUNT_MANAGEMENT_SUCCESS:
      return Object.assign({}, state, {
      });
    case DELETE_DISCOUNT_MANAGEMENT_ERROR:
      return Object.assign({}, state, {
        discountDeleteError: action.errorMsg,
      });
    case APPLY_VOUCHER_START:
      return Object.assign({}, state, {
      });
    case APPLY_VOUCHER_SUCCESS:
      return Object.assign({}, state, {
        vocherResponse: action.vocher,
      });
    case APPLY_VOUCHER_ERROR:
      return Object.assign({}, state, {
        error: action.errorMsg,
      });
    case PAYMENT_START:
      return Object.assign({}, state, {
      });
    case PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        paymentResponse: action.payment,
      });
    case PAYMENT_ERROR:
      return Object.assign({}, state, {
        error: action.errorMsg,
      });
    default:
      return state;
  }
};

export default discountManagement;
