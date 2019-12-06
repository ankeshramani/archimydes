import {
  GET_DISCOUNT_MANAGEMENT_START,
  GET_DISCOUNT_MANAGEMENT_SUCCESS,
  GET_DISCOUNT_MANAGEMENT_ERROR,
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
} from "./constant";
import {
  getDiscountApi,
  addDiscountApi,
  deleteDiscountApi,
  applyVoucherApi,
  paymentApi
} from "../api/discountManagement";
import { ADD_DISCOUNT_MENAGEMENT_MSG,DELETE_DISCOUNT_MENAGEMENT_MSG, APPLY_VOUCHER_MSG ,PAYMENT_MSG } from "../common/constants";

const getDiscountStart = () => ({
  type: GET_DISCOUNT_MANAGEMENT_START,
});

const getDiscountSuccess = json => ({
    type: GET_DISCOUNT_MANAGEMENT_SUCCESS,
    getDiscountResponse: json.data,
});

const getDiscountError = error => ({
    type: GET_DISCOUNT_MANAGEMENT_ERROR,
    errorMsg: error.message
  });

export const getDiscountManagement = () => {
  return async (dispatch) => {
    dispatch(getDiscountStart());
    try {
      const response = await getDiscountApi();
      dispatch(getDiscountSuccess(response));
      return response;
    } catch (error) {
      dispatch(getDiscountError(error));
      return error;
    }
  }
};

const addDiscountStart = () => ({
  type: ADD_DISCOUNT_MANAGEMENT_START,
});

const addDiscountSuccess = json => ({
  type: ADD_DISCOUNT_MANAGEMENT_SUCCESS,
  addDiscountResponse: json.data,
  successMsg: ADD_DISCOUNT_MENAGEMENT_MSG
});

const addDiscountError = error => ({
  type: ADD_DISCOUNT_MANAGEMENT_ERROR,
  errorMsg: error.message
});

export const addDiscountManagement = (data) => {
  return async (dispatch) => {
    dispatch(addDiscountStart());
    try {
      const response = await addDiscountApi(data);
      dispatch(addDiscountSuccess(response));
      return response;
    } catch (error) {
      dispatch(addDiscountError(error));
      console.log(error)
      return error;
    }
  }
};

const deleteDiscountManagementStart = () => ({
  type: DELETE_DISCOUNT_MANAGEMENT_START,
});

const deleteDiscountManagementSuccess = () => ({
  type: DELETE_DISCOUNT_MANAGEMENT_SUCCESS,
  successMsg: DELETE_DISCOUNT_MENAGEMENT_MSG
});

const deleteDiscountManagementError = (error) => ({
  type: DELETE_DISCOUNT_MANAGEMENT_ERROR,
  errorMsg: error && error.response && error.response.data && error.response.data.message
});

export const deleteDiscountManagement= (id) => {
  return async (dispatch) => {
    dispatch(deleteDiscountManagementStart());
    try {
      const response = await deleteDiscountApi(id);
      dispatch(deleteDiscountManagementSuccess(response));
      return response;
    } catch (error) {
      dispatch(deleteDiscountManagementError(error));
      return error;
    }
  }
};

const applyVoucherStart = () => ({
  type: APPLY_VOUCHER_START,
});

const applyVoucherSuccess = json => ({
  type: APPLY_VOUCHER_SUCCESS,
  vocher: json.data,
  successMsg: APPLY_VOUCHER_MSG
});

const applyVoucherError = error => ({
  type: APPLY_VOUCHER_ERROR,
  errorMsg: error.response.data.errorMessage
});

export const applyVoucher = (vocherNumber) => {
  return async (dispatch) => {
    dispatch(applyVoucherStart());
    try {
      const response = await applyVoucherApi(vocherNumber);
      dispatch(applyVoucherSuccess(response));
      return response;
    } catch (error) {
      dispatch(applyVoucherError(error));
      return error;
    }
  }
};

const paymentStart = () => ({
  type: PAYMENT_START,
});

const paymentSuccess = json => ({
  type: PAYMENT_SUCCESS,
  payment: json.data,
  successMsg: PAYMENT_MSG
});

const paymentError = error => ({
  type: PAYMENT_ERROR,
  errorMsg: error.response.data.errorMessage
});

export const paymentData = (data) => {
  return async (dispatch) => {
    dispatch(paymentStart());
    try {
      const response = await paymentApi(data);
      dispatch(paymentSuccess(response));
      return response;
    } catch (error) {
      dispatch(paymentError(error));
      return error;
    }
  }
};



