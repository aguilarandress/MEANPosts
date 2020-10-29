const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const UserModel = require('../../models/User');

// @route   GET - /api/users/test
// @desc    Test route for users
router.get('/test', (req, res) => {
  res.json({ message: 'User API test route' });
});

router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;
  try {
    // Check for user with username
    const userWithUsername = UserModel.find({ username });
    if (userWithUsername == null) {
      return res.status(400).json({ error: 'Username already exists...' });
    }
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user
    const newUser = new UserModel({
      username,
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
