const { product, image } = require('../models')

exports.getproduct = async (req, res, next, id) => {
    await product.findByPk(id).then(product => {
        if(product){
            req.product = product;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Product does not exists."
        })
    })
}

exports.create = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
   
    await product.create(req.body).then(product => {
       if (req.file) {
        // imagetypeid: DataTypes.INTEGER,
        imagevalues = {
            path: req.file.path,
            mimetype: req.file.path,
            extra: req.file.path
       }
    image.create(imagevalues).then().catch()
    }
        res.status(200).json({
            success: true,
            message: 'Product added successfully',
            result: product
        })
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while adding the product',
                Error: error 
            })
        })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            result: req.products
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching product.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await product.findAll()
    .then(product => {
        if(product.length){
            res.status(200).json({
                success: true,
                message: 'All products fetched successfully',
                result: product
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No products found',
                result: product
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching product',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await product.update(req.body, {where: {id: req.params.productId}})
    .then(product => {
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            result: product
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing product",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await product.destroy({where: {id: req.params.productId}})
    .then(product => {
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
            result: product
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting product",
            Error: error
        })
    })
}