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

//connectDB
connectDatabase();

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