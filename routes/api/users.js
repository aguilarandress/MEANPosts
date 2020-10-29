const express = require('express');
const router = express.Router();

const UserModel = require('../../models/User');

// @route   GET - /api/users/test
// @desc    Test route for users
router.get('/test', (req, res) => {
  res.json({ message: 'User API test route' });
});

module.exports = router;
