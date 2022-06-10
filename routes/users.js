const express = require('express');
const handleErrorAsync = require('../service/handleErrorAsync');
const usersControllers = require('../controllers/users');
const { isAuth } = require('../service/auth');

const router = express.Router();

/* GET users listing. */

router.post('/sign_up', handleErrorAsync(usersControllers.signUp));
router.post('/sign_in', handleErrorAsync(usersControllers.signIn));
router.get('/profile', isAuth, handleErrorAsync(usersControllers.getProfile));
router.patch('/profile', isAuth, handleErrorAsync(usersControllers.patchProfile));
router.post('/updatePassword', isAuth, handleErrorAsync(usersControllers.updatePassword));

module.exports = router;
