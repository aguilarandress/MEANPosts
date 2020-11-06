const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isAuthenticated = require('../../middleware/isAuthenticated');
const router = express.Router();

const UserModel = require('../../models/User');

// @route   GET - /api/auth/test
// @desc    Test route for authentication API
// @access  public
router.get('/test', (req, res) => {
  res.json({ msg: 'Authentication API works!!' });
});

router.post('/', async (req, res) => {
  const { name, password } = req.body;
  try {
    // Check for user
    const userWithName = await UserModel.findOne({ name });
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
        name: userWithName.name,
        code: userWithName.code,
      },
    };
    jwt.sign(payload, 'mysecretkey', { expiresIn: '5 days' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error...' });
  }
});

router.get('/profile', isAuthenticated, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
