import { combineReducers } from "redux";
import simpleReducer from './simpleReducer';
import project from './project';
import sprint from './sprint';
import userStories from './userStories';
import error from './error';
import success from './success';
import login from './login';
import deleteUser from './deleteUser';
import userUpdate from "./userUpdate";
import createUsers from "./createUsers";
import discountManagement from "./discount";
import userCredit from "./credits";
import getPackages from "./package";

export default combineReducers({
  simpleReducer,
  project,
  sprint,
  userStories,
  error,
  success,
  login,
  deleteUser,
  userUpdate,
  createUsers,
  discountManagement,
  userCredit,
  getPackages,

});