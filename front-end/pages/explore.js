import React from 'react'
import Link from 'next/link'
import MovieCard from '../components/movie-card'
import SearchMovie from '../components/search-movie'

class Explorer extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }
  
  componentDidMount() {
  
  }
  
  render() {
    const {movies} = this.state
    return (
      <div>
        <h1 style={{fontSize: 28 }}>Explorer les films</h1>
        <hr style={{marginBottom: 25 }}/>
        <p><i>Cette partie de l'application exploite l'API de <a target="_blank" href="http://www.omdbapi.com/">OMDb !</a></i> Recherchez un film existant pour l'ajouter à votre liste !</p>
        <b>Request url : <a href="http://www.omdbapi.com/?apikey=ed0805fe&">http://www.omdbapi.com/?apikey=ed0805fe&</a></b>
        <SearchMovie></SearchMovie>
        <div className="card-grid">
          { movies.map(m => (
            <MovieCard movie={m} inExplorer></MovieCard>
          ))}
        </div>
      </div>
    );
  }
}

export default Explorer
