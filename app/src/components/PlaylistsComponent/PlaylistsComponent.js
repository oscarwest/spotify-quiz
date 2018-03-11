import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistComponent from '../PlaylistComponent/PlaylistComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    createGame,
    resetGame
} from '../../actions/gameActions';

class PlaylistsComponent extends Component {
    constructor(props) {
        super(props);
        this.handleOnPlaylistClicked = this.handleOnPlaylistClicked.bind(this);
    }

    componentWillMount() {
        this.props.resetGame();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.game) {
            this.props.startGame();
        }
    }

    handleOnPlaylistClicked(playlistId) {
        const userId = this.props.userId;
        this.props.createGame(userId, playlistId);
    }

    render() {
        const playlist = this.props.playlists.map((p, i) => {
            return <PlaylistComponent key={i} name={p.name} id={p.id} onPlaylistClicked={this.handleOnPlaylistClicked} />;
        });

        const errorMessage = this.props.createGameError ?
            <p><strong>Error: Något gick fel!!</strong></p> : null;

        return (
            <div>
                <h1>Playlist Component</h1>
                {errorMessage}
                <ul>{playlist}</ul>
            </div>);
    }
}

PlaylistComponent.propTypes = {
    playlists: PropTypes.array
};

const mapStateToProps = state => ({
    userId: state.spotify.userId,
    game: state.game.game,
    createGameError: state.game.createGameError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createGame,
    resetGame,
    startGame: () => push('/gamehost'),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistsComponent);
