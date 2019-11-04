import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: String,
});


const Movie = mongoose.model('Movie', movieSchema);

export default Movie;