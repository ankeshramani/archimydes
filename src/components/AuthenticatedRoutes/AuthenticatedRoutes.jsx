import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { isLoggedIn } from "../../utils/common";

class AuthenticatedRoute extends Component {
  render() {
    const { children } = this.props;
    // User is logged in
    if (isLoggedIn()) {
      return children;
    }else{
      return <Redirect to="/login-page" />;
    }
  }
}

export default AuthenticatedRoute;
