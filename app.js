const express = require('express')
const app = express()
const userController = require('./controllers/userController.js')
const homeController = require('./controllers/homeController.js')

const userRouter = express.Router()
const homeRouter = express.Router()

userRouter.use('/create', userController.addUser)
userRouter.use('/', userController.getUsers)

app.use('/users', userRouter)

homeRouter.get('/about', homeController.about)
homeRouter.get('/', homeController.index)
app.use('/', homeRouter)

app.use(function (request, response, next) {
  response.status(404).send('Not found')
})

app.listen(3000)
