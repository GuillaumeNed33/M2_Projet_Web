import React from 'react'
import axios from 'axios'
import {withAuthSync, getAuthToken} from "../utils/auth"
import CustomLayout from "../components/layout";
import MovieCard from '../components/movie-card'
import { message } from 'antd'

class MyMoviesPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
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
    
    render() {
        const {movies} = this.state;
        return (
            <CustomLayout tab={"movies"}>
                <h1 style={{fontSize: 28 }}>My movie list</h1>
                <hr style={{marginBottom: 25 }}/>
                {movies.length > 0 ? (
                    <div className="card-grid">
                        { movies.map(m => (
                            <MovieCard key={movies.indexOf(m)} movie={m}/>
                        ))}
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
