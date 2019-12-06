import {
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR
} from "./constant";
import {deleteUsers} from "../api/usersApi";
import {USER_DELETE_SUCCESS_MSE,} from "../common/constants";

const deleteUserStart = () => ({
    type: DELETE_USER_START,
});

const deleteUserSuccess = () => ({
    type: DELETE_USER_SUCCESS,
    successMsg: USER_DELETE_SUCCESS_MSE
});

const deleteUserError = (error) => ({
        type: DELETE_USER_ERROR,
        errorMsg: error && error.response && error.response.data && error.response.data.message
});

export const deleteUser = (id) => {
    return async (dispatch) => {
        dispatch(deleteUserStart());
        try {
            const response = await deleteUsers(id);
            dispatch(deleteUserSuccess(response));
            return response;
        } catch (error) {
            dispatch(deleteUserError(error));
            return error;
        }
    }
};