import React from 'react'
import {withAuthSync} from "../utils/auth"
import CustomLayout from "../components/layout"
import MovieCard from '../components/movie-card'
import SearchMovie from '../components/search-movie'

class ExplorerPage extends React.Component {

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
            <CustomLayout tab={"explore"}>
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
            </CustomLayout>
        );
    }
}

export default withAuthSync(ExplorerPage)
