const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.getSignUp);
router.get('/sign-in', usersController.getSignIn);

router.post('/login', usersController.login);
router.post('/register', usersController.register);

module.exports = router;