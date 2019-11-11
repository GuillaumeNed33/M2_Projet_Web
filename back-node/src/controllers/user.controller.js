const User = require('../models/user');

exports.register = (req, res, next) => {
  User.create(req.body).then(function(user){
    res.send(user);
  }).catch(next);
}

exports.login = (req, res, next) => {
  User.find({}).then(function(user){
    res.send(user);
  });
}
