const joi = require("joi");

const courseValidation = joi.object({
    name : joi.string().required(),
    code : joi.string().required(),
    credits : joi.string().required(),
});

module.exports = courseValidation;