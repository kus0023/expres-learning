const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controller');

router.get("/signin", authController.getSignin);
router.get("/signup", authController.getSignup);

router.post("/signin", authController.login);
router.post("/signup", authController.register);

module.exports = router;