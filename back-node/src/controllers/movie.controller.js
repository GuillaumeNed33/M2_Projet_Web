const Movie = require('../models/movie');
const User = require('../models/user');
const axios = require('axios');

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
    addMovieToDB(req.body).then(async function(movie){
        await addMovieToUserList(req.user, movie);
        res.status(201).send(movie);
    }).catch(next);
}

exports.getMovieFromExplorer = (req, res) => {
    const inputSearch = req.params.searchInput;
    if(inputSearch) {
        axios.get(process.env.OMDB_API_URL + "s=" + inputSearch)
            .then(async response => {
                console.log(response);
                const movies = [];
                response.data["Search"].forEach(element => {
                    const movie = {
                        imdbId: element.imdbID,
                        title: element.Title,
                        year: element.Year,
                        poster: element.Poster,
                    }
                    movies.push(movie);
                })
                res.send(movies)
            })
            .catch(error => {
                console.log(error);
                res.send(error)
            });
    }
    else {
        res.status(400).send("Input search empty")
    }
}

exports.getMovieDetails = (req, res) => {
    const imdbID = req.params.imdbID;
    if(imdbID) {
        try {
            const movie = getMovieDetailsObject(imdbID);
            res.send(movie)
        } catch (e) {
            res.status(400).send("Error during process")
        }
    }
    else {
        res.status(400).send("Empty IMDB ID")
    }
}

exports.addMovieFromExplorer = (req, res) => {
    const imdbID = req.body.imdbID;
    if(imdbID) {
        try {
            const movie = getMovieDetailsObject(imdbID);
            addMovieToDB(movie).then(async function(m){
                await addMovieToUserList(req.user, m);
                res.status(201).send(m);
            }).catch(next);
        } catch (e) {
            res.status(400).send("Error during process")
        }
    }
    else {
        res.status(400).send("Empty IMDB ID")
    }
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

getMovieDetailsObject = (imdbID) => {
    axios.get(process.env.OMDB_API_URL + "i=" + imdbID)
        .then(async response => {
            console.log(response);
            const movieResponse = response.data;
            const releaseDate = formatDate(new Date(movieResponse.Released))
            const directors = movieResponse.Director.split[","].forEach(element => { element = element.trim()})
            const genres = movieResponse.Genre.split[","].forEach(element => { element = element.trim()})
            return {
                title: movieResponse.Title,
                release_date: releaseDate,
                directors: directors,
                plot: movieResponse.Plot,
                poster: movieResponse.Poster,
                genres: genres,
                runtime: movieResponse.Runtime.split(" min")[0],
            }
        })
        .catch(error => {
            console.log(error);
            return null;
        });
}

addMovieToDB = (movie) => {
    return Movie.create(movie);
}

formatDate = (d) => {
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear();
    
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    
    return [year, month, day].join('-');
}
