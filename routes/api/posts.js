const express = require('express');
const { body, validationResult } = require('express-validator');
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

// @route   GET - /api/posts/user/:userId
// @desc    Gets all the posts of a user
// @access  private
router.get('/user/:userId', isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;
    // Get posts
    const posts = await PostModel.find({ user: userId }).sort({ date: -1 });
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
    const post = await PostModel.findById(id)
      .populate({
        path: 'user',
        select: 'username',
      })
      .populate({ path: 'comments.user', select: 'username' });
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
router.post(
  '/',
  [
    body('title').isString().withMessage('Please enter a title for your post'),
    body('body')
      .isString()
      .withMessage('Please enter a description for you post'),
  ],
  isAuthenticated,
  async (req, res) => {
    // Get errors
    const errors = validationResult(req);
    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get post and user information
      const { title, body } = req.body;
      const { user } = req;
      const newPost = new PostModel({
        title,
        body,
        user: user._id,
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
  }
);

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

// @route   PUT - /api/posts/:id
// @desc    Updates a single post
// @access  private
router.put(
  '/:id',
  [
    body('title').isString().withMessage('Please enter a title for your post'),
    body('body')
      .isString()
      .withMessage('Please enter a description for your post'),
  ],
  isAuthenticated,
  async (req, res) => {
    // Get errors
    const errors = validationResult(req);
    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      // Find post by id
      const updatedPost = await PostModel.findById(id);
      // Set attributes
      updatedPost.title = title;
      updatedPost.body = body;
      // Save post
      await updatedPost.save();
      return res.json(updatedPost);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error...' });
    }
  }
);

// @route   POST - /api/posts/:id/comments
// @desc    Adds a new comment to post
// @access  private
router.post(
  '/:id/comments',
  [body('comment').isString().withMessage('Please enter a valid comment')],
  isAuthenticated,
  async (req, res) => {
    // Get errors
    const errors = validationResult(req);
    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get commented post
      const { id } = req.params;
      const commentedPost = await PostModel.findById(id);
      if (!commentedPost) {
        res.status(404).json({ success: false, message: 'Post not found' });
      }
      const userId = req.user._id;
      const { comment } = req.body;
      // Vreate comment
      commentedPost.comments.push({ text: comment, user: userId });
      commentedPost.save();
      res.json(commentedPost);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error...' });
    }
  }
);

module.exports = router;
