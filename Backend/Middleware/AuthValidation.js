const joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        lastname: joi.string().min(3).required(),
        phone: joi.string().length(10).pattern(/^\d+$/).required(),
        dob: joi.date().required(),
        gender: joi.string().valid('male', 'female').required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required(),
        weight: joi.number().min(30).max(300).required(),
        heightFeet: joi.number().integer().min(1).max(8).required(),
        heightInches: joi.number().integer().min(0).max(11).required(),
        goalWeight: joi.number().min(30).max(300).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Validation error", error: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Validation error", error: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
};
