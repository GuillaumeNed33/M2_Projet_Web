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

exports.getMoviesFromExplorer = (req, res) => {
    const inputSearch = req.params.searchInput;
    if(inputSearch) {
        axios.get(process.env.OMDB_API_URL + "s=" + inputSearch)
            .then(response => {
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

exports.getMovieDetails = async (req, res) => {
    const imdbID = req.params.imdbID;
    if(imdbID) {
        try {
            const movie = await getMovieDetailsObject(imdbID);
            res.send(movie)
        } catch (e) {
            res.status(400).send("Error during process")
        }
    }
    else {
        res.status(400).send("Empty IMDB ID")
    }
}

exports.addMovieFromExplorer = async (req, res) => {
    const imdbID = req.body.imdbID;
    if(imdbID) {
        try {
            const movie = await getMovieDetailsObject(imdbID);
            const m = await addMovieToDB(movie)
            await addMovieToUserList(req.user, m);
            res.status(201).send(m);
        } catch (e) {
            console.log(e)
            res.status(400).send("Error during process")
        }
    }
    else {
        res.status(400).send("Empty IMDB ID")
    }
}

addMovieToUserList = (user, movie) => {
    User.findOne({_id: user._id}).then(async user => {
        user.movies.push(movie);
        await user.save();
    }).catch(e => {
        console.error(e);
    })
};

getMovieDetailsObject = (imdbID) => {
    return axios.get(process.env.OMDB_API_URL + "i=" + imdbID)
        .then(response => {
            const movieResponse = response.data;
            const releaseDate = formatDate(new Date(movieResponse.Released))
            const directors = movieResponse.Director.split(",").map(s => s.trim())
            const genres = movieResponse.Genre.split(",").map(s => s.trim())
            const runtime = movieResponse.Runtime.split(" min")[0].trim()
            return {
                title: movieResponse.Title,
                release_date: releaseDate,
                directors: directors,
                plot: movieResponse.Plot,
                poster: movieResponse.Poster,
                genres: genres,
                runtime: runtime,
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
