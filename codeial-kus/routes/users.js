const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.getSignUp);
router.get('/sign-in', usersController.getSignIn)

module.exports = router;