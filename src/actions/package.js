import {
  GET_PACKAGE_START,
  GET_PACKAGE_SUCCESS,
  GET_PACKAGE_ERROR,
} from "./constant";
import { getPackegeApi } from "../api/package";

const getPackageStart = () => ({
  type: GET_PACKAGE_START,
});

const getPackageSucces = json => ({
  type: GET_PACKAGE_SUCCESS,
  package: json.data,
});

const getPackageError = error => ({
  type: GET_PACKAGE_ERROR,
  errorMsg: error.message
});

export const getPackage = () => {
  return async (dispatch) => {
    dispatch(getPackageStart());
    try {
      const response = await getPackegeApi();
      dispatch(getPackageSucces(response));
      return response;
    } catch (error) {
      dispatch(getPackageError(error));
      return error;
    }
  }
};