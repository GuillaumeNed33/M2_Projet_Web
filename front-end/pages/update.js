import React from 'react'
import { withAuthSync } from '../utils/auth'
import CustomLayout from "../components/layout";
import MovieFormAntd from '../components/movie-form'

class UpdateMoviePage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <CustomLayout tab={"update"}>
                <h1 style={{fontSize: 28 }}>Modification d'un film</h1>
                <hr style={{marginBottom: 25 }}/>
                <MovieFormAntd/>
            </CustomLayout>
        );
    }
}

export default withAuthSync(UpdateMoviePage)
