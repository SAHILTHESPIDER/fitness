const joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        lastname: joi.string().min(3).required(),
        phone: joi.string().length(10).required(),
        dob: joi.date().required(),
        gender: joi.string().valid('male', 'female').required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Error in validation", error: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Error in validation", error: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
