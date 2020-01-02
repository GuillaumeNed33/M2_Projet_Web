import React from 'react'
import PropTypes from 'prop-types';

import { Card, Icon, Tooltip, Popconfirm } from 'antd';
const { Meta } = Card;

class MovieCard extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        //TODO : uniformize style
        const {movie} = this.props;
        const description = !this.props.inExplorer ? movie.plot : movie.year
        const poster = (movie.poster && movie.poster !== "N/A") ? movie.poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Forbidden_Symbol_Transparent.svg/400px-Forbidden_Symbol_Transparent.svg.png"
        const actions = !this.props.inExplorer ? (
            [
                <Tooltip placement="bottom" title={"See details"}>
                    <Icon type="eye" key="view" onClick={() => this.props.handleViewClick(movie)} />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Edit movie"}>
                    <Icon type="edit" key="edit" onClick={() => this.props.handleEditClick(movie)} />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Delete the movie from your list"}>
                    <Popconfirm
                        placement="bottomRight"
                        title={"Are you sure you want to delete this movie from your list?"}
                        onConfirm={() => this.props.handleRemoveClick(movie)}
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
                    <Icon type="eye" key="view" onClick={() => this.props.handleViewClick(movie)}/>
                </Tooltip>,
                <Tooltip placement="bottom" title={"Add the movie to your list"}>
                    <Icon type="plus" key="plus" onClick={() => this.props.handleAddClick(movie)} />,
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
    inExplorer: PropTypes.bool,
    handleViewClick: PropTypes.func,
    handleEditClick: PropTypes.func,
    handleRemoveClick: PropTypes.func,
    handleAddClick: PropTypes.func
}
MovieCard.defaultProps = {
    movie: {
        imdbId: "",
        title: "Untitled",
        plot: "",
        year: "",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Forbidden_Symbol_Transparent.svg/400px-Forbidden_Symbol_Transparent.svg.png"
    },
    inExplorer: false,
    handleViewClick: () => {console.log("default handleViewClick function.")},
    handleEditClick: () => {console.log("default handleEditClick function.")},
    handleRemoveClick: () => {console.log("default handleRemoveClick function.")},
    handleAddClick: () => {console.log("default handleAddClick function.")}
}

export default MovieCard
