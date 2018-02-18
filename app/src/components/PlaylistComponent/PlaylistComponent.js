import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PlaylistComponent extends Component {
    handleClick = () => {
        this.props.onPlaylistClicked(this.props.id);
    }

    render() {
        return (<li>{this.props.name}<button onClick={this.handleClick}>Create Game</button></li>);
    }
}

PlaylistComponent.PropTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    onPlaylistClicked: PropTypes.any.isRequired
};

export default PlaylistComponent;
