const router = require("express").Router();
const cloudinary = require("../cloud/cloudinay");
const upload = require("../middleware/multer");
const User = require('../model/userModel');
const res = require("express/lib/response");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    User.findOne({ email: req.body.email })
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
                        //user: data
                        message: 'Admin created Successfully'
                    })
                }
            });
        });
};

exports.signin = async (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return req.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { id, firstName, lastName, email, role, fullName } = user;//_id as id
                    res.status(200).json({
                        token,
                        user: { id, firstName, lastName, email, role, fullName }
                    });
                } else {
                    return res.status(400).jason({
                        message: 'Invalid Password'
                    })
                }
            } else {
                return res.stsus(400).json({ message: 'Something went wrong' })
            }
        });
}

exports.requireSignin = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();

};
