export const QueryParameterNames = {
  ReturnUrl: 'returnUrl',
  Message: 'message',
};

export const LoginActions = {
  Login: 'login',
  LoginCallback: 'login-callback',
  LoginFailed: 'login-failed',
};

const prefix = '/authentication';

export const ApplicationPaths = {
  DefaultLoginRedirectPath: `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : ' / '}`,
  ApiAuthorizationClientConfigurationUrl: `api/configuration`,
  ApiAuthorizationPrefix: prefix,
  Login: `${prefix}/${LoginActions.Login}`,
  LoginFailed: `${prefix}/${LoginActions.LoginFailed}`,
  LoginCallback: `${prefix}/${LoginActions.LoginCallback}`,
};
