const router = require("express").Router();
const cloudinary = require("../cloud/cloudinay");
const upload = require("../middleware/multer");
const User = require('../model/userModel');
const res = require("express/lib/response");
const jwt = require('jsonwebtoken');

/**
 *Admin Signup
 */
exports.signup = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (user) return res.status(400).json({
                    message: 'Admin already registered'
                });
                const {
                    firstName,
                    lastName,
                    email,
                    password

                } = req.body;
                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    username: Math.random().toString(),
                    role: 'admin'
                });

                _user.save((error, data) => {
                    if (error) {
                        return res.status(400).json({
                            message: 'Something went wrong'
                        });
                    }
                    if (data) {
                        return res.status(201).json({
                            message: 'Admin created Successfully'
                        })
                    }
                });
            });
    }
    catch (err) {
        console.log(err);
    }
};
/**
 *Admin Signin
 */
exports.signin = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (error) return req.status(400).json({ error });
                if (user) {

                    if (user.authenticate(req.body.password) && user.role === 'admin') {
                        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        const { id, firstName, lastName, email, role, fullName } = user;
                        res.status(200).json({
                            token,
                            user: { id, firstName, lastName, email, role, fullName }
                        });
                    } else {
                        return res.status(400).json({
                            message: 'Invalid Password'
                        })
                    }
                } else {
                    return res.status(400).json({ message: 'Something went wrong' })

                }
            });
    }
    catch (err) {
        console.log(err);
    }
}


