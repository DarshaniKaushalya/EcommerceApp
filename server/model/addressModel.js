const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        // trim: true,
        // min: 3,
        // max: 50
    },
    mobileNumber: {
        type: number,
        required: true,
        trim: true,
    },
    pinCode: {
        type: String,
        required: true,
        trim: true,
        type: number
    },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    cityDistrictTown: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        required: true,
    },
    landmark: {
        type: String,
        min: 10,
        max: 100
    },
    alternatePhone: {
        type: String,
    },
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'work'],
        required: true,
    },

});

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    address: [addressSchema]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('userAddress', userAddressSchema);