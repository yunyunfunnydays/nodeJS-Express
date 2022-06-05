const express = require('express');
const handleErrorAsync = require('../service/handleErrorAsync');
const PostsControllers = require('../controllers/posts');

const router = express.Router();

router.get('/', handleErrorAsync(PostsControllers.getPosts));
router.post('/', handleErrorAsync(PostsControllers.createPosts));
router.patch('/:id', handleErrorAsync(PostsControllers.patchPosts));
router.delete('/:id', handleErrorAsync(PostsControllers.deleteById));
router.delete('/', handleErrorAsync(PostsControllers.deleteAll));

module.exports = router;
