const joi = require("@hapi/joi");

const validationSchema = {
    usersignup: joi.object({
        firstName: joi.string().max(10).min(3).required(),
        lastName: joi.string().max(10).min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().max(10).min(3).required(),
        confirmPassword: joi.string().valid(joi.ref('password')).required()
    }),
    usersignin: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    }),

};

module.exports = validationSchema;