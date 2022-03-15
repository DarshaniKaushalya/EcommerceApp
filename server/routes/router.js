const express = require('express');
const router = express.Router()
const productionController = require('../controller/product');
const upload = require("../middleware/multer");

router.post('/', upload.single("image"), productionController.create);
router.get('/', productionController.find);
router.get('/:id', productionController.find);
router.put('/:id', upload.single("image"), productionController.update);
router.delete('/:id', productionController.delete);

module.exports = router;