import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import store, {history} from './store';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from "react-router-dom";

import AuthenticatedRoutes from "components/AuthenticatedRoutes/AuthenticatedRoutes.jsx";

import { indexRoutes, privateRoutes } from "routes/index.jsx";
import "assets/scss/material-kit-pro-react.css?v=1.2.0";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route exact path={prop.path} key={key} component={prop.component} />;
                })}

                <AuthenticatedRoutes>
                  {privateRoutes.map((prop, key) => {
                    return <Route exact path={prop.path} key={key} component={prop.component} />;
                  })}
                </AuthenticatedRoutes>
            </Switch>
        </ConnectedRouter>
    </Provider>
    , 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
