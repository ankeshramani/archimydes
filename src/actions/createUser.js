import {
    SAVE_CREATE_USER_START,
    SAVE_CREATE_USER_SUCCESS,
    CREATE_USER_SAVE_ERROR
} from "./constant";
import { CREATE_USER_SAVE_SUCCESS_MSG } from "../common/constants";
import { createNewUserApi } from "../api/createUser";

const saveCreateUserStart = () => ({
    type: SAVE_CREATE_USER_START,
});

const saveCreateUserSuccess = json => ({
    type: SAVE_CREATE_USER_SUCCESS,
    saveResponse: json.data,
    successMsg: CREATE_USER_SAVE_SUCCESS_MSG
});

const saveCreateUserError = error => {
    return {
        type: CREATE_USER_SAVE_ERROR,
        errorMsg: error.data && error.data.errorMessage
    }};

export const createNewUser = (data) => {
    return async (dispatch) => {
        dispatch(saveCreateUserStart());
        try {
            const response = await createNewUserApi(data);
            dispatch(saveCreateUserSuccess(response));
            return response;
        } catch (error) {
            dispatch(saveCreateUserError(error.response));
            return error;
        }
    }
};



