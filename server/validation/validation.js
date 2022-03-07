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

    address: joi.object({
        name: joi.string().max(10).min(3),
        mobileNumber: joi.number().max(10),
        pinCode: joi.number().max(5),
        locality: joi.string().max(10).min(3),
        address: joi.string().max(10).min(3),
        cityDistrictTown: joi.string().max(10).min(3),
        landmark: joi.string(),
        alternatePhone: joi.number().max(10),
        addressType: joi.string()
    })

};

module.exports = validationSchema;