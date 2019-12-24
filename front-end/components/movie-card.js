import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { getAuthToken } from '../utils/auth'

import { Card, Icon, Tooltip, Popconfirm, message, Button } from 'antd';
const { Meta } = Card;

class MovieCard extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {}
        this.success = this.success.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.detailsFromOMDB = this.detailsFromOMDB.bind(this)
        this.addFromOMDB = this.addFromOMDB.bind(this)
    }
    
    success = () => {
        message
            .loading('Action in progress..', 2.5)
            .then(() => message.success('Film ajouté à votre liste avec succès', 2.5))
            .catch(() => message.error('Erreur durant l\'ajout du film à votre liste', 2.5))
    };
    
    confirmDelete = () => {
        console.log("delete movie")
    }
    
    detailsFromOMDB = () => {
        const token = getAuthToken();
        axios.get(process.env.API_URL + '/explorer/imdbID/' + this.props.movie.imdbId,
            { headers: {"Authorization" : token} })
            .then(async response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    addFromOMDB = () => {
        const token = getAuthToken();
        const imdbID =  this.props.movie.imdbId;
        axios.post(process.env.API_URL + '/explorer/imdbID',
            { imdbID:  imdbID },
            { headers: {"Authorization" : token} })
            .then(async response => {
                console.log(response)
                message.success('Successfully added to your movie list.');
            })
            .catch(error => {
                console.log(error);
                message.success('An error occurred');
            });
    }
    
    render() {
        const {movie} = this.props;
        const description = !this.props.inExplorer ? movie.plot : movie.year
        const poster = (movie.poster && movie.poster !== "N/A") ? movie.poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Forbidden_Symbol_Transparent.svg/400px-Forbidden_Symbol_Transparent.svg.png"
        const actions = !this.props.inExplorer ? (
            [
                <Tooltip placement="bottom" title={"See details"}>
                    <Icon type="eye" key="view" />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Edit movie"}>
                    <Icon type="edit" key="edit" />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Delete the movie from your list"}>
                    <Popconfirm
                        placement="bottomRight"
                        title={"Are you sure you want to delete this movie from your list?"}
                        onConfirm={this.confirmDelete}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <Icon type="delete" key="delete" />
                    </Popconfirm>
                </Tooltip>
            ]
        ) : (
            [
                <Tooltip placement="bottom" title={"See details"}>
                    <Icon type="eye" key="view" onClick={this.detailsFromOMDB}/>
                </Tooltip>,
                <Tooltip placement="bottom" title={"Add the movie to your list"}>
                    <Icon type="plus" key="plus" onClick={this.addFromOMDB} />,
                </Tooltip>
            ]
        )
        return (
            <Card
                className="movie-card"
                style={{ width: 300 }}
                cover={
                    <img
                        alt={movie.title + " poster"}
                        src={poster}
                    />
                }
                actions={actions}
            >
                <Meta
                    title={movie.title}
                    description={description}
                />
                <style jsx>{`
        .ant-card {
          margin: 5px 0 5px 5px !important;
        }
      `}</style>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
    inExplorer: PropTypes.bool
}
MovieCard.defaultProps = {
    movie: {
        imdbId: "",
        title: "Untitled",
        plot: "",
        year: "",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Forbidden_Symbol_Transparent.svg/400px-Forbidden_Symbol_Transparent.svg.png"
    },
    inExplorer: false
}

export default MovieCard
