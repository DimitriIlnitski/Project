const express = require('express')
const mongoose = require('mongoose')
const app = express()

const userRouter = require('./routes/userRouter.js')
const homeRouter = require('./routes/homeRouter.js')
const productRouter = require('./routes/productRouter.js')

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false }))

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/', homeRouter)

app.use(function (request, response, next) {
  response.status(404).send('Not found')
})

mongoose.connect(
  'mongodb://localhost:27017/usersdb',
  { useUnifiedTopology: true },
  function (err) {
    if (err) return console.log(err)
    app.listen(3000, function () {
      console.log('Server awaits for connection...')
    })
  }
)
