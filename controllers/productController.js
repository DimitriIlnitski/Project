const Product = require('../models/product.js')

exports.addProduct = function (request, response) {
  response.render('createProduct.hbs')
}

exports.editProduct = function (request, response) {
  if (!request.body) return response.status(400)
  const productId = request.body.id
  Product.findById(productId, function (err, item) {
    if (err) return console.log(err)
    response.render('editProduct.hbs', item)
  })
}

//Редагування продукту - перестало працювати
exports.editHandlingProduct = function (request, response) {
  console.log(request.body)
  if (!request.body) return response.status(400)
  const productId = request.body.id
  const productName = request.body.name
  const productVolume = request.body.volume
  const productMaterial = request.body.material
  const productPrice = request.body.price
  Product.findByIdAndUpdate(
    productId,
    {
      name: productName,
      volume: productVolume,
      material: productMaterial,
      price: productPrice,
    },
    function (err, allProducts) {
      if (err) {
        console.log(err)
        response.status(400)
      }
      response.redirect('/products')
    }
  )
}

//Видалення продукту
exports.removeProduct = function (request, response) {
  if (!request.body) return response.status(400)
  const productId = request.body.id
  Product.findByIdAndDelete(productId, function (err, prod) {
    if (err) return console.log(err)
    console.log('Видалено продукт:' + prod)
  })
  response.redirect('/products')
}

//Сотрування по ціні по зростанню - довести до ума
exports.sortProduct = function (request, response) {
  console.log(request.body)
  if (!request.body) return response.status(400)
  Product.find({})
    .sort({ name: 1 })
    .exec(function (err, allProducts) {
      if (err) {
        console.log(err)
        response.status(400)
      }
      response.render('products.hbs', { products: allProducts })
    })
}

//Пошук по імені
exports.searchProduct = function (request, response) {
  if (!request.body) return response.status(400)
  console.log(request.body.name)
  const productName = request.body.name
  console.log(productName)
  Product.find({ name: productName }, function (err, product) {
    if (err) {
      console.log(err)
      response.status(400)
    }
    response.render('products.hbs', { products: product })
  })
}

// Розрахунок загального обєму - додати кнопку
exports.getVolume = function (request, response) {
  console.log(request.body)
  let cursor = Product.find()
  let volume = 0
  while (cursor.hasNext) {
    volume += cursor.next()
  }
  response.render('layout.hbs', {
    volume: volume,
  })
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
  const productName = request.body.name
  const productVolume = request.body.volume
  const productMaterial = request.body.material
  const productPrice = request.body.price
  const product = new Product({
    name: productName,
    volume: productVolume,
    material: productMaterial,
    price: productPrice,
  })
  product.save(function (err) {
    if (err) return console.log(err)
    response.redirect('/products')
  })
}
