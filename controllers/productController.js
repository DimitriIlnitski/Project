const Product = require('../models/product.js')

exports.addProduct = function (request, response) {
  response.render('createProduct.hbs')
}

exports.getProducts = function (request, response) {
  Product.find({}, function (err, allProducts) {
    if (err) {
      console.log(err)
      response.status(400)
    }
    response.render('products.hbs', {
      products: allProducts,
    })
  })
}

exports.postProduct = function (request, response) {
  if (!request.body) return response.status(400)
  productName = request.body.name
  productVolume = request.body.volume
  productMaterial = request.body.material
  productPrice = request.body.price
  const product = new Product({
    name: productName,
    ram: productVolume,
    color: productMaterial,
    price: productPrice,
  })
  product.save(function (err) {
    if (err) return console.log(err)
    response.redirect('/products')
  })
}
