const express = require('express');
const handleErrorAsync = require('../service/handleErrorAsync');
const postsControllers = require('../controllers/posts');
const { isAuth } = require('../service/auth');

const router = express.Router();

router.get('/', isAuth, handleErrorAsync(postsControllers.getPosts));
router.post('/', isAuth, handleErrorAsync(postsControllers.createPosts));
router.patch('/:id', isAuth, handleErrorAsync(postsControllers.patchPosts));
router.delete('/:id', isAuth, handleErrorAsync(postsControllers.deleteById));
router.delete('/', isAuth, handleErrorAsync(postsControllers.deleteAll));

module.exports = router;
