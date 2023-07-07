const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.getSignUp);
router.get('/sign-in', usersController.getSignIn);

router.post('/login', passport.authenticate('local', {failureRedirect: '/users/sign-in'}), usersController.login);
router.post('/register', usersController.register);

module.exports = router;