const router = require("express").Router();
const cloudinary = require("../utils/cloudinay");
const upload = require("../utils/multer");
const Product = require('../model/productModel');
const res = require("express/lib/response");

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        //res.json(result);

        //Create Product
        let product = new Product({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });
        //save product
        await product.save();
        res.json(product);
    } catch (err) {
        console.log(err);
    }

});
router.get("/", async (req, res) => {
    try {
        let product = await Product.find();
        res.json(product);
    } catch (err) {
        console.log(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        //Find product by id
        let product = await Product.findById(req.params.id);
        //Delete image from clodinary
        await cloudinary.uploader.destroy(product.cloudinary_id);
        //Delete product from db
        await product.remove();
        res.json(product);
    } catch (err) {
        console.log(err);
    }
});

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        await cloudinary.uploader.destroy(product.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name: req.body.name || product.name,
            avatar: result.secure_url || product.avatar,
            cloudinary_id: result.public_id || product.cloudinary_id,
        };
        product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(product);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;