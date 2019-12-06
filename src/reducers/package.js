import {
  GET_PACKAGE_START,
  GET_PACKAGE_SUCCESS,
  GET_PACKAGE_ERROR,
} from "../actions/constant";

const getPackages = (
  state = {
    packageList: []
  },
  action,
) => {
  switch (action.type) {
    case GET_PACKAGE_START:
      return Object.assign({}, state, {
      });
    case GET_PACKAGE_SUCCESS:
      return Object.assign({}, state, {
        packageList: action.package,
      });
    case GET_PACKAGE_ERROR:
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
};

export default getPackages;
