const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    quantity: {
        type: Number
    },
    image: {
        data: Buffer,
        contentType: String
    },
    cloudinaryId: {
        type: String,
    },
}, { timestamps: true, versionKey: false });

userSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("product", userSchema);

