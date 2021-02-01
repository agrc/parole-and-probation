import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants';
import authService from './AuthorizeService';

export const AuthenticatorContext = React.createContext({
  user: null,
});

export default class AuthorizeRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      authenticated: false,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.authenticationChanged());
    this.populateAuthenticationState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  render() {
    const { ready, authenticated } = this.state;
    var link = document.createElement('a');
    link.href = ApplicationPaths.DefaultLoginRedirectPath;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`;
    if (!ready) {
      return <div></div>;
    } else {
      const { component: Component, ...rest } = this.props;
      return (
        <Route
          {...rest}
          render={(props) => {
            if (authenticated) {
              if (!this.state.user?.profile['DOCFieldMap:AccessGranted']) {
                return <Redirect to={ApplicationPaths.AccessDenied} />;
              }

              return (
                <AuthenticatorContext.Provider value={this.state.user}>
                  <Component {...props} />
                </AuthenticatorContext.Provider>
              );
            } else {
              return <Redirect to={redirectUrl} />;
            }
          }}
        />
      );
    }
  }

  async populateAuthenticationState() {
    const user = await authService.getUser();
    this.setState({ ready: true, authenticated: !!user, user });
  }

  async authenticationChanged() {
    this.setState({ ready: false, authenticated: false, user: null });
    await this.populateAuthenticationState();
  }
}
