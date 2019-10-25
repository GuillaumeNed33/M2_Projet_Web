import React from 'react'
import Link from 'next/link'

class MyMovies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        this.getMoviesFromDB()
        .then(res => {
            
        })
        .catch(e => {
            console.error(e)
        }
    }

    getMoviesFromDB() {
        //axios query
    }

    render() {
        if(movies.length === 0) {
            return {

            }
        }
        return (
            <div>MA PAGE MOVIES</div>
        );
    }
}

export default MyMovies