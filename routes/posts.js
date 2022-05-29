const express = require('express');
const PostsControllers = require('../controllers/posts');

const router = express.Router();

router.get('/', PostsControllers.getPosts);
router.post('/', PostsControllers.createPosts);
router.patch('/:id', PostsControllers.patchPosts);
router.delete('/:id', PostsControllers.deleteById);
router.delete('/', PostsControllers.deleteAll);

module.exports = router;
