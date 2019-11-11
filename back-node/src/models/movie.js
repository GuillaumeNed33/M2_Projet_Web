const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  },
  release_date: {
    type: Date,
    required: [true, 'Release date field is required']
  },
  directors: {
    type: [String],
    required: [true, 'Director(s) field is required']
  },
  plot: {
    type: String,
    required: [true, 'Plot field is required']
  },
  poster: {
    type: String,
  },
  genres: {
    type: [String],
    required: [true, 'Genre(s) field is required']
  },
  runtime: { //minutes
    type: Number,
    required: [true, 'Runtime field is required']
  }
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
