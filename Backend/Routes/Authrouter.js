const router = require('express').Router();
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup } = require('../Controllers/AuthController');

router.post("/login", loginValidation, (req, res) => {
    res.send('Login success');
});

router.post("/signup", signupValidation, signup,(req,res) => {
    res.status(201).json({ message: "User created successfully", success: true });
});

module.exports = router;
