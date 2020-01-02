import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'

class MovieDetails extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        const {movie} = this.props
        if(movie === null) {
            return(<div><h2>No details available.</h2></div>)
        } else {
                const hasPoster = (movie.poster && movie.poster !== "N/A")
                const release_date = moment(movie.release_date)
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1 style={{ textAlign: 'center' }}> - {movie.title.toUpperCase()} - </h1>
                        {hasPoster &&
                        <img src={movie.poster}
                             alt={"poster " + movie.title}
                             style={{ maxHeight: 300, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto' }}
                        />
                        }
                        <p><b>Released: </b>{release_date.format('DD/MM/YYYY')}</p>
                        <p><b>Director(s): </b>{movie.directors.join(", ")}</p>
                        <p><b>Genre(s): </b>{movie.genres.join(", ")}</p>
                        <p><b>Runtime: </b>{movie.runtime} minutes</p>
                        <p><b>Plot: </b>{movie.plot}</p>
                    </div>
                );
        }
    }
}

MovieDetails.propTypes = {
    movie: PropTypes.object,
}
MovieDetails.defaultProps = {
    movie: null,
}

export default MovieDetails
