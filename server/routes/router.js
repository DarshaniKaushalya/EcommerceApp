const express = require('express');
const router = express.Router()
const productionController = require('../controller/product');
const cartController = require('../controller/cart');
const userController = require('../controller/user');
const adminController = require('../controller/admin');

const upload = require("../middleware/multer");

router.post('/products', upload.single("image"), productionController.create);
router.get('/products', productionController.find);
router.get('/products/:id', productionController.find);
router.put('/products/:id', upload.single("image"), productionController.update);
router.delete('/products/:id', productionController.delete);

router.post('/cart', cartController.create);


//Admin signinup & login
router.post('/admin/signin', adminController.signin);
router.post('/admin/signup', adminController.signup);

// router.post('/user', userController.create);
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);

// router.post('/profile', userController.requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });






module.exports = router;