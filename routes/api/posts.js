const express = require('express');
const isAuthenticated = require('../../middleware/isAuthenticated');
const router = express.Router();

/**
 * Quiz NodeJS / Bases de datos 2
 * Andres Esteban Aguilar Moya 2019156214
 */

const PostModel = require('../../models/Post');
const UserModel = require('../../models/User');

// @route   GET - /api/posts/test
// @desc    Test route for posts API
router.get('/test', (req, res) => {
  res.json({ message: 'Posts test route' });
});

// @route   GET - /api/posts/
// @desc    Fetches all the posts
router.get('/', async (req, res) => {
  try {
    // Get posts
    const posts = await PostModel.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error...' });
  }
});

// @route   GET - /api/posts/:id
// @desc    Fetches a single post
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Find post by id
    const post = await PostModel.findById(id);
    return res.json(post);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error...' });
  }
});

// @route   POST - /api/posts/
// @desc    Creates a new post
router.post('/', isAuthenticated, async (req, res) => {
  const { title, description, user } = req.body;
  try {
    const userWithName = await UserModel.findOne({ name: user });
    // Check for user
    if (!userWithName) {
      // Create user
      const newUser = new UserModel({
        code: user,
        name: user,
        password: '1234',
      });
      await newUser.save();
    }
    // Create new post
    const newPost = new PostModel({
      title,
      description,
      user,
    });
    // Save post
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error...' });
  }
});

// @route   DELETE - /api/posts/:id
// @desc    Deletes a single post by id
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.deleteOne({ _id: id });
    return res.json({ success: true, message: 'Post removed...' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error...' });
  }
});

// @route   PATCH - /api/posts/:id
// @desc    Updates a single post
router.patch('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    // Find post by id
    const updatedPost = await PostModel.findById(id);
    // Set attributes
    updatedPost.title = title;
    updatedPost.description = description;
    // Save post
    await updatedPost.save();
    return res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error...' });
  }
});

module.exports = router;
