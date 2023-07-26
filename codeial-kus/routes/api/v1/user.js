const router = require('express').Router();

const userApi = require('../../../controllers/api/v1/user_api');

router.post('/login', userApi.login);

module.exports = router;