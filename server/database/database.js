const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("mongoDB is connected")
    } catch (err) {
        console.log({
            message: 'Unable to connect to the database',
            err,
        });
    }
};

module.exports = connectDatabase;