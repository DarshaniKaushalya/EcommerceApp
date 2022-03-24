const mongoose = require("mongoose");
/**
 * MongoDB database connection
 */
const connectDatabase = async () => {
    try {
        //MongoDB Cloud
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });

        //Local DB
        await mongoose.connect(process.env.LOCAL_URI, { useNewUrlParser: true });

        console.log("mongoDB is connected")
    } catch (err) {
        console.log({
            message: 'Unable to connect to the database',
            err,
        });
    }
};

module.exports = connectDatabase;