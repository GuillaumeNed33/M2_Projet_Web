import React from 'react'
import {withAuthSync} from "../utils/auth"
import CustomLayout from "../components/layout";
import MovieCard from '../components/movie-card'

class MyMoviesPage extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          movies: []
      }
  }

  render() {
    const {movies} = this.state;
    return (
        <CustomLayout tab={"movies"}>
          <h1 style={{fontSize: 28 }}>Ma liste de film</h1>
          <hr style={{marginBottom: 25 }}/>
          {movies.length !== 0 ? (
              <div className="card-grid">
                { movies.map(m => (
                    <MovieCard key={m.id} movie={m}></MovieCard>
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
        </CustomLayout>

    )
  }
}

export default withAuthSync(MyMoviesPage)
