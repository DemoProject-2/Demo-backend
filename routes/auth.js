const router = require('express').Router();
const { login, register } = require('../controllers/authController')

// register  new user
router.post("/register", register);

// login user
router.post("/login", login);

module.exports = router;
