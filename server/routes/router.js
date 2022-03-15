const express = require('express');
const router = express.Router()
const productionController = require('../controller/product');

const { requireSignin, buyerMiddleware, adminMiddleware } = require('../middleware');

//Validations
const { signupValidation, signinValidation } = require('../middleware/validationMiddleware');

const orderController = require('../controller/cart');
const userController = require('../controller/user');
const adminController = require('../controller/admin');
const addressController = require('../controller/address');
const newOrderController = require('../controller/order');
const updateOrderController = require('../controller/orderAdmin');
const upload = require("../middleware/multer");

//add to cart
router.post('/cart', requireSignin, buyerMiddleware, orderController.create);
//production routes
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
router.post('/admin/signin', signinValidation, adminController.signin);
router.post('/admin/signup', signupValidation, adminController.signup);


//Buyer signinup & login
router.post('/buyer/signin', signinValidation, userController.signin);
router.post('/buyer/signup', signupValidation, userController.signup);

//adding address to shipping,Billing
router.post('/buyer/address', requireSignin, buyerMiddleware, addressController.addAddress);

//buyer place a order
router.post('/order', requireSignin, buyerMiddleware, newOrderController.addOrder);
//buyer get all orders
router.get('/orders', requireSignin, buyerMiddleware, newOrderController.getOrders);
//buyer delete Order
router.delete('/order/:id', requireSignin, buyerMiddleware, newOrderController.deleteOrder);

//admin view all orders
router.get('/buyer/orders', requireSignin, adminMiddleware, newOrderController.findOrder);
//admin view all orders by id
router.get('/order/:id', requireSignin, adminMiddleware, newOrderController.findOrder);
//admin order status update
router.post('/order/status', requireSignin, adminMiddleware, updateOrderController.updateOrder);


// router.post('/user', userController.create);
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);

// router.post('/profile', userController.requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });


module.exports = router;