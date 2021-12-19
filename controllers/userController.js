const User = require('../models/user.js')
exports.addUser = function (request, response) {
  response.render('create.hbs')
}

exports.getUsers = function (request, response) {
  User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err)
      return response.sendStatus(400)
    }
    response.render('users.hbs', {
      users: User.getAll(),
    })
  })
}

exports.postUser = function (request, response) {
  if (!request.body) return response.sendStatus(400)
  const username = request.body.name
  const userage = request.body.age
  const user = new User({ name: username, age: userAge })
  user.save(function (err) {
    if (err) return console.log(err)
    response.redirect('/users')
  })
}
