const express = require('express')
const app = express()
const bodyparser = require("body-parser");
const morgan = require('morgan');
const dotenv = require("dotenv");
const connectDatabase = require('./server/database/database');
dotenv.config();
const path = require('path');

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

//set view engine
app.set("view engine", "ejs") //you can specify your tamplate in here ejs/html/pug

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//Route
app.use('/', routes);

app.listen(PORT, () => console.log('Server is running'))

module.exports = app