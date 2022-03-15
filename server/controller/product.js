const router = require("express").Router();
const cloudinary = require("../cloud/cloudinay");
const upload = require("../middleware/multer");
const Product = require('../model/productModel');
const res = require("express/lib/response");

/**
 * 
 */
exports.create = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        //Create Product
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            image: result.secure_url,
            cloudinaryId: result.public_id,
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.log(err);
    }

};

//return and retrive product/ retrive and return a single product
exports.find = async (req, res) => {

    if (req.params.id) {
        const id = req.params.id;
        try {
            const response = await Product.findById(id);
            res.send(response);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        }
    } else {
        try {
            const response = await Product.find();
            res.send(response);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Error Occurred while retriving product information"
            })
        }
    }
};

exports.update = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        await cloudinary.uploader.destroy(product.cloudinaryId);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name: req.body.name || product.name,
            price: req.body.price || product.price,
            description: req.body.description || product.description,
            quantity: req.body.quantity || product.quantity,
            image: result.secure_url || product.image,
            cloudinaryId: result.public_id || product.cloudinaryId,
        };
        product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(product);
    } catch (err) {
        console.log(err);
    }
};

exports.delete = async (req, res) => {
    try {
        //Find product by id
        let product = await Product.findById(req.params.id);
        //Delete image from cloudinary
        await cloudinary.uploader.destroy(product.cloudinaryId);
        //Delete product from db
        await product.remove();
        res.json(product);
    } catch (err) {
        console.log(err);
    }

};

