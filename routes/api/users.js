const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const UserModel = require('../../models/User');

// @route   GET - /api/users/test
// @desc    Test route for users
router.get('/test', (req, res) => {
  res.json({ message: 'User API test route' });
});

// @route   POST - /api/users/register
// @desc    Creates a new user
router.post('/register', async (req, res) => {
  const { code, name, password } = req.body;
  try {
    // Check for user with username
    const userWithName = await UserModel.findOne({ name });
    if (userWithName) {
      return res.status(400).json({ error: 'Username already exists...' });
    }
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const newUser = new UserModel({
      code,
      name,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();
    res.json(createdUser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error...' });
  }
});

module.exports = router;
