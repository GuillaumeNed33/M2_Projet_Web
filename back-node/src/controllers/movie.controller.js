const Movie = require('../models/movie');

exports.getMoviesForAuthUser = (req, res, next) => {
  Movie.find({}).then(function(movie){
    res.send(movie);
  });
}

exports.addMovie = (req, res, next) => {
  Movie.create(req.body).then(function(movie){
    res.send(movie);
  }).catch(next);
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
