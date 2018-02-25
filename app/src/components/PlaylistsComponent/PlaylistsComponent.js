import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistComponent from '../PlaylistComponent/PlaylistComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    createGame,
} from '../../actions/gameActions';

class PlaylistsComponent extends Component {
    constructor(props) {
        super(props);
        this.handleOnPlaylistClicked = this.handleOnPlaylistClicked.bind(this);
    }

    handleOnPlaylistClicked(playlistId) {
        const userId = this.props.userId;
        this.props.createGame(userId, playlistId);
    }

    render() {
        const playlist = this.props.playlists.map((p, i) => {
            return <PlaylistComponent key={i} name={p.name} id={p.id} onPlaylistClicked={this.handleOnPlaylistClicked} />;
        });

        return (
            <div>
                <h1>Playlist Component</h1>
                <ul>{playlist}</ul>
            </div>);
    }
}

PlaylistComponent.propTypes = {
    playlists: PropTypes.array
};

const mapStateToProps = state => ({
    userId: state.spotify.userId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createGame
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistsComponent);
