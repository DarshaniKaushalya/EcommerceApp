const { usersignup } = require("../validation/validation");
const { usersignin } = require("../validation/validation");

/**
 * signupValidation
 */
module.exports = {
    signupValidation: async (req, res, next) => {
        const value = await usersignup.validateAsync(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },

    /**
    * signinValidation
    */
    signinValidation: async (req, res, next) => {
        const value = await usersignin.validateAsync(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },

};
