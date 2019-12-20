const Movie = require('../models/movie');
const User = require('../models/user');

exports.getMoviesForAuthUser = (req, res, next) => {
  User.find({_id: req.user._id}).populate('movies')
      .then(function(user){
    res.send(user);
  });
}

exports.getMovieById = (req, res, next) => {
  Movie.find({_id: req.params.id}).then(function(movie){
    res.send(movie);
  });
}

exports.addMovie = (req, res, next) => {
  Movie.create(req.body).then(async function(movie){
    await addMovieToUserList(req.user, movie);
    res.status(201).send(movie);
  }).catch(next);
}

exports.getMovieFromExplorer = (req, res, next) => {
  const inputSearch = req.params.searchInput;
  //TODO: call API and format response
}

exports.updateMovie = (req, res, next) => {
  Movie.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Movie.findOne({_id: req.params.id}).then(function(movie){
      res.send(movie);
    });
  }).catch(next);
}

exports.removeMovie = (req, res, next) => {
  Movie.findByIdAndRemove({_id: req.params.id}).then(function(movie){
    res.send(movie);
  }).catch(next);
}

addMovieToUserList = async (user, movie) => {
  User.findOne({_id: user._id}).then(async user => {
    user.movies.push(movie);
    await user.save();
  }).catch(e => {
    console.error(e);
  })
};
