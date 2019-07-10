import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeAuthenticator, makeUserManager, Callback } from 'react-oidc';
import { oidcConfig } from './config'

const userManager = makeUserManager(oidcConfig);
const AppWithAuth = makeAuthenticator({
    userManager: userManager,
    signInArgs: {}
})(<App />);

ReactDOM.render((
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
            <Route
                path="/callback"
                render={routeProps => (
                    <Callback
                        onSuccess={() => routeProps.history.push('/')}
                        userManager={userManager}
                    />
                )}
            />
            <AppWithAuth />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
