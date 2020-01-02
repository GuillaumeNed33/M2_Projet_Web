import React from 'react'
import axios from 'axios'
import { getAuthToken, withAuthSync } from "../utils/auth"
import CustomLayout from "../components/layout"
import MovieCard from '../components/movie-card'
import SearchMovie from '../components/search-movie'
import { message } from 'antd'

class ExplorerPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            searchStarted: false,
            error: false
        }
        this.handleSearchResults = this.handleSearchResults.bind(this);
        this.handleViewMovieClick = this.handleViewMovieClick.bind(this);
        this.handleAddMovieClick = this.handleAddMovieClick.bind(this);
    }
    
    handleSearchResults = (movies, error= false) => {
        this.setState({
            movies: [...movies],
            searchStarted: true,
            error: error
        })
    }
    
    handleViewMovieClick = (movie) => {
        const token = getAuthToken();
        axios.get(process.env.API_URL + '/explorer/imdbID/' + movie.imdbId,
            { headers: {"Authorization" : token} })
            .then(async response => {
                //TODO: Display Infos
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleAddMovieClick = (movie) => {
        const token = getAuthToken();
        const imdbID =  movie.imdbId;
        axios.post(process.env.API_URL + '/explorer/imdbID',
            { imdbID:  imdbID },
            { headers: {"Authorization" : token} })
            .then(async response => {
                console.log(response)
                message.success('Successfully added to your movie list.');
            })
            .catch(error => {
                console.log(error);
                message.success('An error occurred.');
            });
    }
    
    render() {
        const {movies} = this.state
        return (
            <CustomLayout tab={"explore"}>
                <h1 style={{fontSize: 28 }}>Explore movies</h1>
                <hr style={{marginBottom: 25 }}/>
                <p><i>This part of the application exploits the <a target="_blank" href="http://www.omdbapi.com/">OMDb </a> API!</i> Search for an existing movie to add it to your list!</p>
                <b>Request url : <a href="http://www.omdbapi.com/?apikey=ed0805fe&">http://www.omdbapi.com/?apikey=ed0805fe&</a></b>
                
                <br/>
                <SearchMovie handleSearchResults={this.handleSearchResults}/>
                <br/>
                
                {this.state.searchStarted &&
                <div className="card-grid">
                    <p>{movies.length} result(s)</p>
                    {movies.map(m => (
                        <MovieCard
                            key={movies.indexOf(m)}
                            movie={m}
                            inExplorer
                            handleViewClick={this.handleViewMovieClick}
                            handleAddClick={this.handleAddMovieClick}
                        />
                    ))}
                </div>
                }
            </CustomLayout>
        );
    }
}

export default withAuthSync(ExplorerPage)
