import React from 'react'
import MovieFormAntd from '../components/movie-form'

class AddMovie extends React.Component {

    constructor(props) {
        super(props)
      console.log("constructor")
    }

    componentDidMount() {
      console.log("mount")

    }

    render() {
      console.log("render")
      return (
          <div>
              <h1 style={{fontSize: 28 }}>Ajouter un film</h1>
              <hr style={{marginBottom: 25 }}/>
              <MovieFormAntd/>
          </div>
        );
    }
}

export default AddMovie
