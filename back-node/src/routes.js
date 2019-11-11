const express = require ('express');
const router = express.Router();

const movieController = require('./controllers/movie.controller');
const userController = require('./controllers/user.controller');

/** Auth routes **/
router.post('/register', userController.register);
router.post('/login', userController.login);

/** Movies Routes **/
router.get('/movies', movieController.getMoviesForAuthUser);
router.get('/movie/:id', movieController.getMovieById);
router.post('/movie', movieController.addMovie);
router.put('/movie/:id', movieController.updateMovie);
router.delete('/movie/:id', movieController.removeMovie);
router.post('/explorer', movieController.addMovieFromExplorer);

module.exports = router;
