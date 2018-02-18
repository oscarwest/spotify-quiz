import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistComponent from '../PlaylistComponent/PlaylistComponent';

class PlaylistsComponent extends Component {

    handlePlaylistClicked(id) {
        console.log('playlist selected: ', id);
    }

    render() {
        const playlist = this.props.playlists.map((p, i) => {
            return <PlaylistComponent key={i} name={p.name} id={p.id} onPlaylistClicked={this.handlePlaylistClicked} />;
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

export default PlaylistsComponent;
