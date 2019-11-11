const Movie = require('../models/movie');
const User = require('../models/user');

exports.getMoviesForAuthUser = (req, res, next) => {
  Movie.find({}).then(function(movie){
    res.send(movie);
  });
}

exports.getMovieById = (req, res, next) => {
  Movie.find({_id: req.params.id}).then(function(movie){
    res.send(movie);
  });
}

exports.addMovie = (req, res, next) => {
  Movie.create(req.body).then(function(movie){
    res.send(movie);
  }).catch(next);
}

exports.addMovieFromExplorer = (req, res, next) => {
  //TODO: ajouter le film dans la BD
  //TODO: ajouter une relation entre le film et l'utilisateur connecté
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
