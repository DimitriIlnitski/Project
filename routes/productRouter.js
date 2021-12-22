const express = require('express')
const productController = require('../controllers/productController.js')

const productRouter = express.Router()

productRouter.use('/postproduct', productController.postProduct)
productRouter.use('/create', productController.addProduct)
productRouter.use('/', productController.getProducts)

module.exports = productRouter
