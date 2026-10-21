const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    lastname: joi.string().min(3).required(),
    phone: joi.string().length(10).pattern(/^\d+$/).required(),
    dob: joi.date().max("now").required(),
    gender: joi.string().valid("male", "female").required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    weight: joi.number().min(30).max(300).required(),
    heightFeet: joi.number().integer().min(1).max(8).required(),
    heightInches: joi.number().integer().min(0).max(11).required(),
    goalWeight: joi.number().min(30).max(300).required(),
    dietPreference: joi.string().valid("veg", "nonveg", "both").default("both"),
    workoutDays: joi.number().integer().min(1).max(7).default(3),
    workoutSetting: joi.string().valid("gym", "home", "either").default("either"),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  req.body = value;
  return next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  req.body = value;
  return next();
};

const updateValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3),
    lastname: joi.string().min(3),
    phone: joi.string().length(10).pattern(/^\d+$/),
    dob: joi.date().max("now"),
    gender: joi.string().valid("male", "female"),
    weight: joi.number().min(30).max(300),
    heightFeet: joi.number().integer().min(1).max(8),
    heightInches: joi.number().integer().min(0).max(11),
    goalWeight: joi.number().min(30).max(300),
    dietPreference: joi.string().valid("veg", "nonveg", "both"),
    workoutDays: joi.number().integer().min(1).max(7),
    workoutSetting: joi.string().valid("gym", "home", "either"),
  }).min(1);
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  req.body = value;
  return next();
};

module.exports = { signupValidation, loginValidation, updateValidation };
