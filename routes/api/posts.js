const express = require('express');
const isAuthenticated = require('../../middleware/isAuthenticated');
const router = express.Router();

const PostModel = require('../../models/Post');

// @route   GET - /api/posts/test
// @desc    Test route for posts API
// @access  public
router.get('/test', (req, res) => {
  res.json({ message: 'Posts test route' });
});

// @route   GET - /api/posts/
// @desc    Fetches all the posts
// @access  public
router.get('/', async (req, res) => {
  try {
    // Get posts
    const posts = await PostModel.find().populate('user').sort({ date: -1 });
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
// @access  public
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
// @access  private
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Get post and user information
    const { title, description } = req.body;
    const { _id } = req.user;
    const newPost = new PostModel({
      title,
      description,
      user: _id,
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
// @access  private
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
// @access  private
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
