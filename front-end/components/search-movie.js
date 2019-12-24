import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { getAuthToken } from '../utils/auth'

import { Input } from 'antd';
const { Search } = Input;

class SearchMovie extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  
  changeSearchLoadingState = (enable) => {
    this.setState({loading: enable})
  }
  
  searchMovies = (input) => {
    if(input) {
      this.changeSearchLoadingState(true)
      const token = getAuthToken();
      axios.get(process.env.API_URL + '/explorer/' + input,
          { headers: {"Authorization" : token} })
          .then(async response => {
            this.changeSearchLoadingState(false)
            this.props.handleSearchResults(response.data)
          })
          .catch(error => {
            console.log(error);
            this.changeSearchLoadingState(false)
            this.props.handleSearchResults({}, true)
          });
    }
  }
  
  render() {
    return (
        <Search className="input-search" placeholder="Cherchez vos films par titre !" onSearch={value => this.searchMovies(value)} loading={this.state.loading} enterButton />
    );
  }
}

SearchMovie.propTypes = {
  handleSearchResults: PropTypes.func.isRequired
}
SearchMovie.defaultProps = {
  handleSearchResults: (movies) => {console.log("handleSearchResults function with param : " + movies)}
}

export default SearchMovie
