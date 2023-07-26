const router = require('express').Router();

const postApi = require('../../../controllers/api/v1/post_api');

const passport = require('passport');

router.get('/', postApi.getAll);

router.delete('/', passport.authenticate('jwt', {session: false}), postApi.delete);

module.exports = router;