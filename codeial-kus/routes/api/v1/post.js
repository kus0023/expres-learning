const router = require('express').Router();

const postApi = require('../../../controllers/v1/post_api');

router.get('/', postApi.getAll);

module.exports = router;