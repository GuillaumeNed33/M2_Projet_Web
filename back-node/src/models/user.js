const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'First name field is required']
  },
  last_name: {
    type: String,
    required: [true, 'Last name field is required']
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'Username field is required']
  },
  password: {
    type: String,
    minlength: 3,
    required: [true, 'Password field is required']
  },
  movies: {
    type: [{ type: Schema.Types.ObjectId, ref: 'movie' }],
    default: []
  }
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PRIVATE, { algorithm: 'RS256', expiresIn: '1h' });
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
