const router = require('express').Router();
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup, login } = require('../Controllers/AuthController');

// Properly use login controller instead of a placeholder response
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
