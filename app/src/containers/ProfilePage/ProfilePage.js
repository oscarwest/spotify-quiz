import React, { Component } from 'react';
import PlaylistsComponent from '../../components/PlaylistsComponent/PlaylistsComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getProfile,
    getPlaylists
} from '../../actions/spotifyActions';

class ProfilePage extends Component {
    componentDidMount() {
        this.props.getProfile();
        // TODO: Fix
        this.props.getPlaylists('partyfille');
    }

    render() {
        if (this.props.profile_name && this.props.playlists) {
            return (
                <div>
                    <h1>Profile page</h1>
                    <p>Welcome: {this.props.profile_name}</p>
                    <PlaylistsComponent playlists={this.props.playlists} />
                </div>
            );
        } else {
            return (<p>Loading..</p>);
        }
    }
}
const mapStateToProps = state => ({
    profile_name: state.spotify.profile_name,
    playlists: state.spotify.playlists
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProfile,
    getPlaylists
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
