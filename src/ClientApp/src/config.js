module.exports = {
  mappingConfig: {
    MIN_DESKTOP_WIDTH: 768,
    WEB_MERCATOR_WKID: 3857,
    MARKER_FILL_COLOR: [130, 65, 47, 0.5],
    MARKER_OUTLINE_COLOR: [230, 126, 21, 0.7],
  },
  oidcConfig: {
    authority: 'https://login.dts.utah.gov/sso/oauth2/',
    client_id: 'synange-feoffor-673742',
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    response_type: 'token id_token',
    scope: 'openid profile email',
    filterProtocolClaims: true,
    loadUserInfo: true
  }
}
