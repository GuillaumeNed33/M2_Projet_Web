import React from 'react'
import {withAuthSync} from "../utils/auth";
import CustomLayout from "../components/layout";
import MovieFormAntd from '../components/movie-form'

class AddMoviePage extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <CustomLayout tab={"add"}>
                <h1 style={{fontSize: 28 }}>Add a movie</h1>
                <hr style={{marginBottom: 25 }}/>
                <MovieFormAntd/>
            </CustomLayout>
        );
    }
}

export default withAuthSync(AddMoviePage)
