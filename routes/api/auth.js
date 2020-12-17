const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const isAuthenticated = require('../../middleware/isAuthenticated');
const router = express.Router();

const UserModel = require('../../models/User');

// @route   GET - /api/auth/test
// @desc    Test route for authentication API
// @access  public
router.get('/test', (req, res) => {
  res.json({ msg: 'Authentication API works!!' });
});

// @route   POST - /api/auth
// @desc    Authenticate user and get token
// @access  public
router.post(
  '/',
  [
    body('username').isString().withMessage('Please enter your username'),
    body('password').isString().withMessage('Please enter your password'),
  ],
  async (req, res) => {
    // Get errors
    const errors = validationResult(req);
    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      // Check for user
      const userWithName = await UserModel.findOne({ username });
      if (!userWithName) {
        return res.status(404).json({ msg: 'Invalid credentials' });
      }
      // Check for password
      const passwordMatches = await bcrypt.compare(
        password,
        userWithName.password
      );
      if (!passwordMatches) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      // Create token
      const payload = {
        user: {
          _id: userWithName._id,
          username: userWithName.username,
          email: userWithName.email,
        },
      };
      // Sign token and send
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error...' });
    }
  }
);

// @route   GET - /api/auth/me
// @desc    Get current user information
// @access  public
router.get('/me', isAuthenticated, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
