const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');

// get all posts
router.route('/posts').get(PostController.getPosts);

// get ane post
router.route('/posts/:id').get(PostController.getPost);

// add posts
router.route('/posts').post(PostController.addPost);

module.exports = router;
