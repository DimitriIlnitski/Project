const Product = require('../models/product.js')

exports.addProduct = function (request, response) {
  response.render('createProduct.hbs')
}

//Редагування продукту - реалізувати видалення через id - додати кнопку
exports.editProduct = function (request, response) {
  if (!request.body) return response.status(400)
  productName = request.body.name
  productVolume = request.body.volume
  productMaterial = request.body.material
  productPrice = request.body.price
  Product.updateOne({ name: productName }, function (err, allProducts) {
    if (err) {
      console.log(err)
      response.status(400)
    } else {
      if (productName === null || productName === null)
        $set: {
          name: productName
        }
      if (productVolume === null || productVolume === null)
        $set: {
          volume: productVolume
        }
      if (productMaterial === null || productMaterial === null)
        $set: {
          name: productMaterial
        }
      if (productPrice === null || productPrice === null)
        $set: {
          name: productPrice
        }
      response.render('products.hbs', { products: allProducts })
    }
  })
}

//Видалення продукту - реалізувати видалення через id - додати кнопку
exports.removeProduct = function (request, response) {
  if (!request.body) return response.status(400)
  // productName = request.body.name
  // Product.deleteOne({ name: productName })
  response.redirect('/products')
}

//Сотрування по ціні по зростанню - додати кнопку (можливо додати спадання)
exports.sortProduct = function (request, response) {
  if (!request.body) return response.status(400)
  Product.find().sort({ price: 1 }, function (err, allProducts) {
    if (err) {
      console.log(err)
      response.status(400)
    }
    response.render('products.hbs', { products: allProducts })
  })
}

//Пошук по імені (додати промпт)
exports.searchProduct = function (request, response) {
  if (!request.body) return response.status(400)
  productName = request.body.name
  Product.find({ name: productName }, function (err, allProducts) {
    if (err) {
      console.log(err)
      response.status(400)
    }
    response.render('products.hbs', { products: allProducts })
  })
}

// Розрахунок загального обєму - додати кнопку
exports.getVolume = function (request, response) {
  let cursor = Product.find()
  let totalVolume = 0
  while (cursor.hasNext()) {
    totalVolume += cursor.next()
  }
  return totalVolume
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
