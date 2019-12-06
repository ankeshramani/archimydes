import React from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const AuthService = { 
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100)
    },
    logout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
  }


const PublicRoute = () => {
    <Route {...rest} render={(props) => (        
          <Component {...props} />         
      )} /> 
}

const PrivateRoute = () => {
    <Route {...rest} render={(props) => (
        AuthService.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} /> 
}

export default class Routes extends React.Component {

    render() {
        return (
            <div>
                <Switch>                        
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PublicRoute exct path="/login" component={Login} />
                </Switch>
            </div>
        );
    }
}