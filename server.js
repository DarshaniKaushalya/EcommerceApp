const express = require('express')
const app = express()
const bodyparser = require("body-parser");
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectDatabase = require('./server/database/database');
dotenv.config();

const routes = require('./server/routes/router');

const cors = require("cors");
// const nodemailer = require("nodemailer");

/*Local client connection*/
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/ecom", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (!err) console.log('db connected');
//     else console.log('db error');
// });

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

//send mails
// app.use(cors());



app.listen(PORT, () => console.log('Server is running'))

module.exports = app