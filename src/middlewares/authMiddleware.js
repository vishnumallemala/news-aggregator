const { decodeJwtAccessToken } = require('../utils/jwt');

async function validateToken(req, res, next) {
  const bearerAuthorizationToken = req.headers.authorization;
  if (!bearerAuthorizationToken) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized: Token is missing',
    });
  }
  const fetchedToken = bearerAuthorizationToken.split(' ')[1];
  if (!fetchedToken) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized: Invalid token format',
    });
  }
  try {
    const decodedUserInformation = await decodeJwtAccessToken(fetchedToken);
    if (
      decodedUserInformation.exp &&
      Date.now() >= decodedUserInformation.exp * 1000
    ) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized: Token has expired',
      });
    }
    req.user = decodedUserInformation;
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized: Invalid token',
    });
  }
  next();
}

module.exports = validateToken;
