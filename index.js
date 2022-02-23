const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//connectDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log("mongoDB is connected"))
    .catch((err) => console.log(err));

//Middleware
app.use(express.json());

//Route
app.use('/product', require('./routes/router'))

app.listen(5000, () => console.log('Server is running'))