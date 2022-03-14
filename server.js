const express = require('express')
const app = express()
const bodyparser = require("body-parser");
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectDatabase = require('./server/database/database');
dotenv.config();

const routes = require('./server/routes/router');

const cors = require("cors");

const PORT = process.env.PORT
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//connectDB
connectDatabase();

//Swager
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce App',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5000/'
            }
        ],
    },
    apis: ['./server/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /products:
 * get:
 *   summary:This API is used to check if get method is working or not
 *   description:v
 *   responses:
 *       200:
 *           description: To test Get method
 */


//Middleware
app.use(express.json());

//log requests
app.use(morgan('tiny'));

//json format
app.use(bodyparser.json({ extended: true }))

//Route
app.use('/', routes);

app.listen(PORT, () => console.log('Server is running'))

module.exports = app