const order = {
    _id: "", //ObjectId
    user: "",
    orderedItems: [],
};


//add to cart
// router.post('/cart', cartController.create);
// router.post('/cart', requireSignin, buyerMiddleware, orderController.create);
// const cartController = require('../controller/cart');
//const orderController = require('../controller/cart');


// router.post('/user', userController.create);
// router.post('/signin', userController.signin);
// router.post('/signup', userController.signup);

// router.post('/profile', userController.requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });


// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

//Swager
// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Ecommerce App',
//             version: '1.0.0'
//         },
//         servers: [
//             {
//                 url: 'http://localhost:5000/'
//             }
//         ],
//     },
//     apis: ['./server/routes/*.js']
// };

// const swaggerSpec = swaggerJSDoc(options)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// /**
//  * @swagger
//  * /products:
//  * get:
//  *   summary:This API is used to check if get method is working or not
//  *   description:v
//  *   responses:
//  *       200:
//  *           description: To test Get method
//  */

