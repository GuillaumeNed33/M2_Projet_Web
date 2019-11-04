import React from 'react'
import Link from 'next/link'
import MovieFormAntd from '../components/movie-form'

class UpdateMovie extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
  
  }
  
  render() {
    return (
      <div>
        <h1 style={{fontSize: 28 }}>Modification d'un film</h1>
        <hr style={{marginBottom: 25 }}/>
        <MovieFormAntd/>
        <div></div>
      </div>
    );
  }
}

export default UpdateMovie
