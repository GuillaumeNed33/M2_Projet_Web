import React from 'react'
import MovieCard from '../components/movie-card'

class MyMovies extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      movies: ["a", "f", "d"]
    }
  }
  
  componentDidMount() {
    /*this.getMoviesFromDB()
    .then(res => {
    
    })
    .catch(e => {
        console.error(e)
    });*/
  }
  
  getMoviesFromDB() {
  }
  
  render() {
    const {movies} = this.state;
    return (
      <div>
        <h1 style={{fontSize: 28 }}>Ma liste de film</h1>
        <hr style={{marginBottom: 25 }}/>
        {movies.length !== 0 ? (
          <div className="card-grid">
            { movies.map(m => (
              <MovieCard movie={m}></MovieCard>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 18 }}>Votre liste de films est vide.</p>
        )}
        <style jsx>{`
        .card-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
}
      `}</style>
      </div>
    
    )
  }
}

export default MyMovies
