import React, { Component } from 'react';
import PlaylistsComponent from '../../components/PlaylistsComponent/PlaylistsComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getProfileAndPlaylists
} from '../../actions/spotifyActions';

class ProfilePage extends Component {
    componentDidMount() {
        if (!this.props.profileName || !this.props.playlists) {
            this.props.getProfileAndPlaylists();
        }
    }

    render() {
        if (this.props.profileName && this.props.playlists) {
            return (
                <div>
                    <h1>Profile page</h1>
                    <p>Welcome: {this.props.profileName}</p>
                    <PlaylistsComponent playlists={this.props.playlists} />
                </div>
            );
        } else {
            return (<p>Loading..</p>);
        }
    }
}

const mapStateToProps = state => ({
    profileName: state.spotify.profileName,
    playlists: state.spotify.playlists
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProfileAndPlaylists
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
