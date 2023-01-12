const { body } = require('express-validator');
const { product } = require("../models");
const { Op } = require("sequelize");

exports.createproductValidation = (req, res) => {
  return [
    body('name', 'Name is Required').notEmpty().trim(),
    body('price', 'price is Required').notEmpty().trim(),
    body('quantity', 'quantity is Required').notEmpty().trim(),
    body('mfg_date', 'mfg_date is Required').notEmpty().trim(),
    body('name').custom(async value => {
      return await product.findOne({ where: { name: value }, raw: true }).then(name => {
        if (name) {
          return Promise.reject('Product name Already Taken')
        }
      })
    })
  ]
}

exports.updateproductValidation = () => {
  return [
    body('name').custom(async (value, { req }) => {
      return await product.findOne({
        where: {
          id: {
            [Op.ne]: req.params.productId
          },
           name: value,
        }, raw: true
      })
        .then(name => {
          if (name) {
            return Promise.reject('Product name Already Taken')
          }
        })
    }),
  ]
}


