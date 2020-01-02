import React from 'react'
import axios from 'axios'
import {withAuthSync, getAuthToken} from "../utils/auth"
import CustomLayout from "../components/layout";
import MovieCard from '../components/movie-card'
import { Drawer, message } from 'antd'
import MovieFormAntd from '../components/movie-form'

class MyMoviesPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            selectedMovie: null,
            drawerViewVisible: false,
            drawerEditVisible: false
        }
        this.closeDrawer = this.closeDrawer.bind(this)
        this.handleViewClick = this.handleViewClick.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
    }
    
    componentDidMount() {
        const token = getAuthToken();
        axios.get(process.env.API_URL + '/movies',
            { headers: {"Authorization" : token} })
            .then(async response => {
                this.setState({
                    movies: response.data
                })
            })
            .catch(error => {
                console.log(error);
                message.error("An error occurred while loading your movie list.")
            })
    }
    
    handleViewClick = (movie) => {
        const movieIndex = this.state.movies.findIndex( m => m._id === movie._id)
        if(movieIndex !== -1) {
            const selectedM = {...this.state.movies[movieIndex]}
            this.setState({
                selectedMovie: selectedM,
                drawerViewVisible: true
            })
        } else {
            message.error("Movie not found.")
        }
    }
    
    handleEditClick = (movie) => {
        const movieIndex = this.state.movies.findIndex( m => m._id === movie._id)
        if(movieIndex !== -1) {
            const selectedM = {...this.state.movies[movieIndex]}
            this.setState({
                selectedMovie: selectedM,
                drawerEditVisible: true
            })
        } else {
            message.error("Movie not found.")
        }
    }
    
    handleRemoveClick = (movie) => {
        const movieIndex = this.state.movies.findIndex( m => m._id === movie._id)
        if(movieIndex !== -1) {
            //TODO : send request to backend
            const moviesCopy = [...this.state.movies]
            moviesCopy.splice(movieIndex, 1)
            console.log(this.state.movies, "OLD")
            console.log(moviesCopy, "NEW")
            this.setState({
                movies: moviesCopy,
                selectedMovie: null
            })
        } else {
            message.error("Movie not found.")
        }
    }
    
    closeDrawer = () => {
        this.setState({
            drawerViewVisible: false,
            drawerEditVisible: false,
        });
    };
    
    render() {
        const {movies} = this.state;
        return (
            <CustomLayout tab={"movies"}>
                <h1 style={{fontSize: 28 }}>My movie list</h1>
                <hr style={{marginBottom: 25 }}/>
                {movies.length > 0 ? (
                    <div>
                    <div className="card-grid">
                        { movies.map(m => (
                            <MovieCard
                                key={movies.indexOf(m)}
                                movie={m}
                                handleViewClick={this.handleViewClick}
                                handleEditClick={this.handleEditClick}
                                handleRemoveClick={this.handleRemoveClick}
                            />
                        ))}
                    </div>
                        <Drawer
                            title="Movie details"
                            width={720}
                            onClose={this.closeDrawer}
                            visible={this.state.drawerViewVisible}
                            bodyStyle={{ paddingBottom: 80 }}
                        >
                            content
                        </Drawer>
                        <Drawer
                            title="Update a movie"
                            width={720}
                            onClose={this.closeDrawer}
                            visible={this.state.drawerEditVisible}
                            bodyStyle={{ paddingBottom: 80 }}
                        >
                            <MovieFormAntd movie={this.state.selectedMovie}/>
                        </Drawer>
                    </div>
                ) : (
                    <p style={{ fontSize: 18 }}>Your movie list is empty.</p>
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
