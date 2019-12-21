import React from 'react'

class Index extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        window.location.href = "/movies"
    }
    
    render() {
        return null;
    }
}

export default Index
