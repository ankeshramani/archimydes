import {
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../actions/constant';


const Login = (
  state = {
    auth: {},
  },
  action,
) => {
  switch(action.type) {
    // Any new Error actions needs to be added here
    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        auth: action.payload,
        error: ""
      })
    }

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        error: action.errorMessage,
        auth: {}
      });
    default:
      return state;
  }
}

export default Login;
