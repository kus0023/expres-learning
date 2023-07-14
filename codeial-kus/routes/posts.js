const express = require('express');
const router = express.Router();
const postman = require('passport');

const postsController = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create', passport.checkAuthentication, postsController.create);

router.delete('/delete', passport.checkAuthentication, postsController.delete);

module.exports = router;