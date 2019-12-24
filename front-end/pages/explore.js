import React from 'react'
import {withAuthSync} from "../utils/auth"
import CustomLayout from "../components/layout"
import MovieCard from '../components/movie-card'
import SearchMovie from '../components/search-movie'

class ExplorerPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            searchStarted: false,
            error: false
        }
        this.handleSearchResults = this.handleSearchResults.bind(this);
    }
    
    handleSearchResults = (movies, error= false) => {
        this.setState({
            movies: movies,
            searchStarted: true,
            error: error
        })
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
                        <MovieCard key={movies.indexOf(m)} movie={m} inExplorer/>
                    ))}
                </div>
                }
            </CustomLayout>
        );
    }
}

export default withAuthSync(ExplorerPage)
