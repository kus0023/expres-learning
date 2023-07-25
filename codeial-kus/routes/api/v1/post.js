const router = require('express').Router();

const postApi = require('../../../controllers/api/v1/post_api');

router.get('/', postApi.getAll);

router.delete('/', postApi.delete);

module.exports = router;