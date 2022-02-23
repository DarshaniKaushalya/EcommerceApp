const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

userSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id }
});


module.exports = mongoose.model("product", userSchema);