const joi = require("joi");

const updateUserValidation = joi.object({
    name : joi.string().min(4),
    email : joi.string().email(),
    password : joi.string().min(6),
    role : joi.string()
    .valid("student","professor","admin")
    
});

module.exports = updateUserValidation;