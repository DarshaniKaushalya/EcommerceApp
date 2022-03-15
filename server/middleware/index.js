const jwt = require('jsonwebtoken');

exports.requireSignin = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();

};

exports.buyerMiddleware = async (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'Access denied' })
    }
    next();

};

exports.adminMiddleware = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Access denied' })
    }
    next();
};

