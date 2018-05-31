const jwt = require('jwt-simple');
const hash = require('object-hash');
const useragent = require('express-useragent');
const { JWTSecret } = require('enmapi').appConfig();

module.exports.encode = async ({ _id, email }) => {
  try {
    const token = await jwt.encode(
      { _id, email, iat: new Date().getTime() },
      JWTSecret
    );
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.decode = async token => {
  try {
    const user = await jwt.decode(token, JWTSecret);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.generateUserToken = async (user, req) => {
  try {
    if (!user) throw new Error('No user provided for token generation');
    const token = await encode(user);
    const source = useragent.parse(req.headers['user-agent']);
    return {
      user: user._id,
      token,
      source
    };
  } catch (error) {
    throw new Error(error);
  }
};

const sourceMatch = (a, b) =>
  Object.keys(a).reduce((r, k) => (a[k] !== b[k] ? false : r), true);

module.exports.existingUserSourceMatch = (user, req) =>
  user.activeTokens.reduce(
    (r, t) =>
      sourceMatch(t.source, useragent.parse(req.headers['user-agent']))
        ? token
        : false,
    true
  );

module.exports.compareUserToken = async (user, req) => {
  try {
    const reqToken = req.token;
    const reqSource = useragent.parse(req.headers['user-agent']);
    if (!user.activeTokens || !user.activeTokens.length || !reqToken)
      throw new Error('No token provided');
    const userToken = user.activeTokens.find(t => t.token === reqToken);
    if (!sourceMatch(userToken.source, reqSource))
      throw new Error('Not a valid token source');
  } catch (error) {
    throw new Error(error);
  }
};
