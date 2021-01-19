import '@arcgis/core/assets/esri/themes/light/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Callback, makeAuthenticator, makeUserManager } from 'react-oidc';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import { oidcConfig } from './config';
import './index.css';
import reportWebVitals from './reportWebVitals';

const userManager = makeUserManager(oidcConfig);
const AppWithAuth = makeAuthenticator({
    userManager: userManager,
    signInArgs: {}
})(App);

ReactDOM.render((
  <React.StrictMode>
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
  </React.StrictMode>
), document.getElementById('root'));

reportWebVitals(console.log);
