const {
  authGetLogoutUser,
  authPostLoginUser,
  authGetValidationToken,
  authPostRegisterUser
} = require('./controllers');

const { authorizeRoute } = require('enmapi/services').Auth;

module.exports = {
  '/auth': {
    get: {
      '/logout': [authorizeRoute, authGetLogoutUser],
      '/validate': [authorizeRoute, authGetValidationToken]
    },
    post: {
      '/login': authPostLoginUser,
      '/register': authPostRegisterUser
    }
  }
};
