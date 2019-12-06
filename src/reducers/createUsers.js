import {
    SAVE_CREATE_USER_SUCCESS, SAVE_CREATE_USER_START, CREATE_USER_SAVE_ERROR
} from "../actions/constant";

const createUsers = (
    state = {
        isSavingCreate: false,
        userCreateUserSavedData: [],
        successCreateUser: [],
    }, action,) => {
    switch (action.type) {
        case SAVE_CREATE_USER_START:
            return Object.assign({}, state, {
                isSavingCreate: true,
            });
        case SAVE_CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                isSavingCreate: true,
                createUserSavedData: state.userCreateUserSavedData.concat(action.saveResponse),
            });
        case CREATE_USER_SAVE_ERROR:
            return Object.assign({}, state, {
                isSavingCreate: true,
                error: action.errorMsg,
            });
        default:
            return state;
    }
};

export default createUsers;
