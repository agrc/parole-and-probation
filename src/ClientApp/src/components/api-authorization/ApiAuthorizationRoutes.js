import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { ApplicationPaths, LoginActions } from './ApiAuthorizationConstants';
import { Login } from './Login';

export default class ApiAuthorizationRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Route path={ApplicationPaths.Login} render={() => loginAction(LoginActions.Login)} />
        <Route path={ApplicationPaths.LoginFailed} render={() => loginAction(LoginActions.LoginFailed)} />
        <Route path={ApplicationPaths.LoginCallback} render={() => loginAction(LoginActions.LoginCallback)} />
        <Route path={ApplicationPaths.AccessDenied} render={AccessDenied} />
      </Fragment>
    );
  }
}

const AccessDenied = () => {
  return (
    <>
      <h1>You do not have access to this resources</h1>
      <p>If you require access, speak to the Department of Corrections.</p>
    </>
  );
};

function loginAction(name) {
  return <Login action={name}></Login>;
}
