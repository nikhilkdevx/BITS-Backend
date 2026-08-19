const joi = require("joi");

const courseValidation = joi.object({
    name : joi.string(),
    code : joi.string(),
    credits : joi.string(),
});

module.exports = courseValidation;