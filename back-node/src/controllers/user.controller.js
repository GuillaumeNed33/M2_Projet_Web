const User = require('../models/user');
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = user.generateAuthToken();
    res.header("Authorizarion", token).status(201).send({
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      },
      token: token
    });
  } catch (e) {
    res.status(400).send(e.errmsg)
  }
};

exports.login = async (req, res, next) => {
  User.findOne({username: req.body.username}).then(async function(user) {
    if(user !== null) {
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (checkPassword) {
          const token = user.generateAuthToken();
          res.header("Authorizarion", token).send({
            user: {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
            },
            token: token
          });
        } else {
          res.status(400).send("Invalid credentials")
        }
    } else {
      res.status(400).send("Invalid credentials")
    }
  }).catch(next);
};
