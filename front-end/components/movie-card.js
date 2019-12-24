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
        console.log("details OMDB")
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
                message.success('An error occured');
            });
    }
    
    render() {
        const {movie} = this.props;
        const description = !this.props.inExplorer ? movie.plot : movie.year
        const poster = (movie.poster && movie.poster !== "N/A") ? movie.poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Forbidden_Symbol_Transparent.svg/400px-Forbidden_Symbol_Transparent.svg.png"
        const actions = !this.props.inExplorer ? (
            [
                <Tooltip placement="bottom" title={"Voir en détails"}>
                    <Icon type="eye" key="view" />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Modifier le film"}>
                    <Icon type="edit" key="edit" />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Supprimer le film de votre liste"}>
                    <Popconfirm
                        placement="bottomRight"
                        title={"Êtes-vous sur de vouloir supprimer ce film de votre liste ?"}
                        onConfirm={this.confirmDelete}
                        okText="Supprimer"
                        cancelText="Annuler"
                    >
                        <Icon type="delete" key="delete" />
                    </Popconfirm>
                </Tooltip>
            ]
        ) : (
            [
                <Tooltip placement="bottom" title={"Voir en détails"}>
                    <Icon type="eye" key="view" onClick={this.detailsFromOMDB}/>
                </Tooltip>,
                <Tooltip placement="bottom" title={"Ajouter le film à votre liste"}>
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
