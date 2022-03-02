const express = require('express');
const router = express.Router()
const productionController = require('../controller/product');
const { requireSignin, buyerMiddleware, adminMiddleware } = require('../middleware');
const orderController = require('../controller/order');
const userController = require('../controller/user');
const adminController = require('../controller/admin');
const addressController = require('../controller/address');
const newOrderController = require('../controller/neworder');
const updateOrderController = require('../controller/orderAdmin');
const upload = require("../middleware/multer");

//production routes
router.post('/products', upload.single("image"), productionController.create);
router.get('/products', productionController.find);
router.get('/products/:id', productionController.find);
router.put('/products/:id', upload.single("image"), productionController.update);
router.delete('/products/:id', productionController.delete);


//Admin signinup & login
router.post('/admin/signin', adminController.signin);
router.post('/admin/signup', adminController.signup);

router.post('/buyer/signin', userController.signin);
router.post('/buyer/signup', userController.signup);

//add to cart
router.post('/order', requireSignin, buyerMiddleware, orderController.create);

//adding address to shipping,Billing
router.post('/address', requireSignin, buyerMiddleware, addressController.addAddress);

//place a order
router.post('/addorder', requireSignin, buyerMiddleware, newOrderController.addOrder);
//get all orders
router.get('/getorders', requireSignin, buyerMiddleware, newOrderController.getOrders);
//delete Order
router.delete('/deleteorder/:id', requireSignin, buyerMiddleware, newOrderController.deleteOrder);

//get order as buyer not working
// router.get('/getorder', requireSignin, buyerMiddleware, newOrderController.getOrder);

//admin view all orders
router.get('/findorder', requireSignin, adminMiddleware, newOrderController.findOrder);
//admin view all orders by id
router.get('/findorder/:id', requireSignin, adminMiddleware, newOrderController.findOrder);
//admin view all orders
router.get('/order/getcustomerorders', requireSignin, adminMiddleware, updateOrderController.getCustomerOrders);
//order update || orderStatus update
router.post('/order/update', requireSignin, adminMiddleware, updateOrderController.updateOrder);

module.exports = router;