const colors = require('colors');
const jwt = require('jsonwebtoken');

async function isAuthenticated(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    // Check valid token
    jwt.verify(token, 'mysecretkey', (error, decoded) => {
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
