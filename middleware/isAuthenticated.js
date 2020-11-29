const colors = require('colors');
const jwt = require('jsonwebtoken');

/**
 * Verifies if the token is valid and the user is authenticated
 * @param {Request} req Request Object
 * @param {Response} res Response object
 * @param {Function} next Next piece of middleware
 */
async function isAuthenticated(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    // Check valid token
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token not valid' });
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error('*ERROR* Authentication middleware error'.red);
    res.status(500).json({ msg: 'Internal server error...' });
  }
}

module.exports = isAuthenticated;
