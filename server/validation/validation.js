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
        name: joi.string().max(10).min(3).required(),
        mobileNumber: joi.number().max(10).required(),
        pinCode: joi.number().max(5).required(),
        locality: joi.string().max(10).min(3).required(),
        address: joi.string().max(10).min(3).required(),
        cityDistrictTown: joi.string().max(10).min(3).required(),
        landmark: joi.string().required(),
        alternatePhone: joi.number().max(10).required(),
        addressType: joi.string().required()
    })

};

module.exports = validationSchema;