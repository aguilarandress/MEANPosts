const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const UserModel = require('../../models/User');

// @route   GET - /api/users/test
// @desc    Test route for users
// @access  public
router.get('/test', (req, res) => {
  res.json({ message: 'User API test route' });
});

// @route   POST - /api/users/register
// @desc    Creates a new user
// @access  public
router.post(
  '/register',
  [
    body('username')
      .isString()
      .withMessage('Please enter your username')
      .isLength({ min: 3 })
      .withMessage('Please enter a valid username'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isString()
      .withMessage('Please enter your password')
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password'),
  ],
  async (req, res) => {
    // Get errors
    const errors = validationResult(req);
    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;
    try {
      // Check for user with username
      const userWithName = await UserModel.findOne({ username });
      if (userWithName) {
        return res.status(400).json({ error: 'Username already exists...' });
      }
      // Check for user with email
      const userWithEmail = await UserModel.findOne({ email });
      if (userWithEmail) {
        return res.status(400).json({ error: 'Email already exists...' });
      }
      // Hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      // Save user
      const createdUser = await newUser.save();
      res.json(createdUser);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error...' });
    }
  }
);

module.exports = router;
