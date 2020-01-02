import React from 'react'
import axios from 'axios'
import {withAuthSync, getAuthToken} from "../utils/auth"
import CustomLayout from "../components/layout";
import MovieCard from '../components/movie-card'
import MovieFormAntd from '../components/movie-form'
import MovieDetails from '../components/movie-details'
import { Drawer, message } from 'antd'

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
        this.handleEditionChange = this.handleEditionChange.bind(this)
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
                console.error(error);
                message.error("An error occurred while loading your movie list.")
            })
    }
    
    handleViewClick = async (movie) => {
        const movieIndex = this.state.movies.findIndex( m => m._id === movie._id)
        if(movieIndex !== -1) {
            const selectedM = {...this.state.movies[movieIndex]}
            await this.setState({
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
            const token = getAuthToken()
            axios.delete(process.env.API_URL + '/movie/' + movie._id,
                { headers: {"Authorization" : token} })
                .then(async response => {
                    const moviesCopy = [...this.state.movies]
                    moviesCopy.splice(movieIndex, 1)
                    this.setState({
                        movies: moviesCopy,
                        selectedMovie: null
                    })
                    message.success('Successfully removed from your movie list.');
                })
                .catch(error => {
                    console.error(error);
                    message.error('An error occurred.');
                });
        } else {
            message.error("Movie not found.")
        }
    }
    
    handleEditionChange = (movie) => {
        const movieIndex = this.state.movies.findIndex( m => m._id === movie._id)
        if(movieIndex !== -1) {
            const moviesCopy = [...this.state.movies]
            moviesCopy[movieIndex] = {...movie}
            this.setState({
                movies: moviesCopy,
                selectedMovie: null,
                drawerViewVisible: false,
                drawerEditVisible: false
            })
        } else {
            message.error("Movie not found.")
        }
    }
    
    closeDrawer = () => {
        this.setState({
            selectedMovie: null,
            drawerViewVisible: false,
            drawerEditVisible: false,
        });
    }
    
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
                            <MovieDetails movie={this.state.selectedMovie} />
                        </Drawer>
                        <Drawer
                            title="Update a movie"
                            width={720}
                            onClose={this.closeDrawer}
                            visible={this.state.drawerEditVisible}
                            bodyStyle={{ paddingBottom: 80 }}
                        >
                            <MovieFormAntd movie={this.state.selectedMovie} handleMovieEdit={this.handleEditionChange}/>
                        </Drawer>
                    </div>
                ) : (
                    <p style={{ fontSize: 18 }}>Your movie list is empty.</p>
                )}
            </CustomLayout>
        )
    }
}

export default withAuthSync(MyMoviesPage)
