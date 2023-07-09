const express = require('express');
const router = express.Router();
const postman = require('passport');

const commentController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create', passport.checkAuthentication, commentController.create);

module.exports = router;