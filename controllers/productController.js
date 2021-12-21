const { request } = require('express')
const Product = require('../models/product.js')

exports.addProduct = function (request, response) {
  response.render('create.hbs') // add
}

exports.getProducts = function (request, response) {
  Product.find({}, function (err, allProducts) { //add allProducts
    if (err) {
      console.log(err)
      response.status(400)
    }
    response.render('product.hbs', {            // add 
      products: Product.getAll(),
    })
  })
}

exports.postProduct = function(request, response){
    if(!request.body) return response.status(400)
    productname = request.body.name;
    productram = request.body.ram;
    productcolor = request.body.color;
    productprice = request.body.price;
    const product = new Product ({name:productname, ram:productram, color:productcolor,price:productprice})
    product.save(function(err){
        if(err) return console.log(err)
        response.redirect('/products')      //add
    }
}
