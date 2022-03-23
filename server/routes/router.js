const express = require('express');
const router = express.Router()
const productionController = require('../controller/product');

const { requireSignin, buyerMiddleware, adminMiddleware } = require('../middleware');
//Validations
const { signupValidation, signinValidation } = require('../middleware/validationMiddleware');
const userController = require('../controller/buyer');
const adminController = require('../controller/admin');
const addressController = require('../controller/address');
const newOrderController = require('../controller/order');
const updateOrderController = require('../controller/orderAdmin');
const upload = require("../middleware/multerMiddleware");


const services = require('../services/render');
router.get('/', services.homeRoutes);
router.get('/add/product', services.addProduct);

/**
 * Routes
 */

//production routes
router.post('/products', requireSignin, adminMiddleware, upload.single("image"), productionController.create);
router.get('/products', productionController.find);
router.get('/products/:id', productionController.find);
router.put('/products/:id', requireSignin, adminMiddleware, upload.single("image"), productionController.update);
// router.delete('/products/:id', requireSignin, adminMiddleware, productionController.delete);
router.delete('/products/:id', productionController.delete);

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

module.exports = router;