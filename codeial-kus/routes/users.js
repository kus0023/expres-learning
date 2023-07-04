const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);

router.post('/add', usersController.addUser);

router.get('/list', usersController.showUsers);

module.exports = router;