const joi = require("joi");

const loginValidation = joi.object({
    email : joi.string().email().required(),
    password : joi.string().min(6).required()
});

module.exports = loginValidation;