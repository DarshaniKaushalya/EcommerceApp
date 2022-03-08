const express = require('express');
const router = express.Router()
const productionController = require('../controller/product');
const { requireSignin, buyerMiddleware, adminMiddleware } = require('../middleware');

//Validations
const { signupValidation, signinValidation, addressValidation } = require('../middleware/validationMiddleware');

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
router.post('/products', upload.single("image"), productionController.create);
router.get('/products', productionController.find);
router.get('/products/:id', productionController.find);
router.put('/products/:id', upload.single("image"), productionController.update);
router.delete('/products/:id', productionController.delete);

//Admin signinup & login
router.post('/admin/signin', signinValidation, adminController.signin);
router.post('/admin/signup', signupValidation, adminController.signup);

//Buyer signinup & login
router.post('/buyer/signin', signinValidation, userController.signin);
router.post('/buyer/signup', signupValidation, userController.signup);

//adding address to shipping,Billing
router.post('/buyer/address', requireSignin, buyerMiddleware, addressValidation, addressController.addAddress);

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


module.exports = router;