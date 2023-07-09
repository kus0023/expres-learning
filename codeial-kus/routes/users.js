const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, usersController.viewProfile);
router.post('/profile', passport.checkAuthentication, usersController.updateProfile)

router.get('/sign-up', passport.checkAlreadyLoggedIn, usersController.getSignUp);
router.get('/sign-in', passport.checkAlreadyLoggedIn, usersController.getSignIn);

router.post('/login', passport.authenticate('local', 
{failureRedirect: '/users/sign-in', successRedirect:"/"}));

router.post('/register', usersController.register);

router.get('/logout', passport.logoutUser);

module.exports = router;