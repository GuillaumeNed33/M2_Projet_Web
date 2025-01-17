const express = require('express');
const auth = require('./auth');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const movieController = require('./controllers/movie.controller');
const userController = require('./controllers/user.controller');

/** Auth routes **/
router.post('/register', userController.register);
router.post('/login', userController.login);

/** Movies Routes **/
router.get('/movies', auth, movieController.getMoviesForAuthUser);
router.get('/movie/:id', auth, movieController.getMovieById);
router.post('/movie', auth, movieController.addMovie);
router.put('/movie/:id', auth, movieController.updateMovie);
router.delete('/movie/:id', auth, movieController.removeMovie);
router.get('/explorer/:searchInput', auth, movieController.getMoviesFromExplorer);
router.get('/explorer/imdbID/:imdbID', auth, movieController.getMovieDetails);
router.post('/explorer/imdbID', auth, movieController.addMovieFromExplorer);
router.post('/upload', upload, movieController.uploadPoster);

module.exports = router;
