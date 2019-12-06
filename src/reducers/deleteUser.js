import {
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR
} from "../actions/constant";

const deleteUser = (state = {
    userDelete: {},
}, action) => {
    switch (action.type) {
        case DELETE_USER_START:
            return Object.assign({}, state, {
            });
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
            });
        case DELETE_USER_ERROR:
            return Object.assign({}, state, {
                userDeleteError: action.errorMsg,
            });
        default:
            return state;
    }
};
export default deleteUser;