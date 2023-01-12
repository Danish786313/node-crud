const express = require('express')
const router = express.Router()
const productcontroller = require("../controllers/prodoctcontroller")
const { createproductValidation, updateproductValidation } = require('../validation/productvalidation');
const { validate } = require('../validation/validate');
const uploader = require("../middleware/image-upload")


router.param("productId", productcontroller.getproduct)

router.post("/product", /* createproductValidation(), validate,  */uploader.upload.single('product-image'), productcontroller.create)

router.get("/product", productcontroller.findAll)

router.get("/product/:productId", productcontroller.findOne)

router.put("/product/:productId", updateproductValidation(), validate, productcontroller.update)

router.delete("/product/:productId", productcontroller.delete)

module.exports = router


