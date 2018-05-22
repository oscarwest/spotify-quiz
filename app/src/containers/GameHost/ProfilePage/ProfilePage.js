import React, { Component } from 'react';
import PlaylistComponent from '../../../components/PlaylistComponent/PlaylistComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getProfileAndPlaylists } from './../../../actions/spotifyActions';
import {
    createQuiz,
    resetGame
} from '../../../actions/quizActions';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.handleOnPlaylistClicked = this.handleOnPlaylistClicked.bind(this);
    }

    componentWillMount() {
        this.props.resetGame();
    }

    componentDidMount() {
        if (!this.props.profileName || !this.props.playlists) {
            this.props.getProfileAndPlaylists();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.quiz) {
            this.props.launchGame();
        }
    }

    handleOnPlaylistClicked(playlistId, ownerId) {
        this.props.createQuiz(ownerId, playlistId);
    }

    render() {
        if (this.props.profileName && this.props.playlists) {
            const playlist = this.props.playlists.map((p, i) => {
                return <PlaylistComponent key={i} name={p.name} id={p.id} ownerId={p.ownerId} onPlaylistClicked={this.handleOnPlaylistClicked} />;
            });

            const errorMessage = this.props.createQuizError ?
                <p><strong>Error: Något gick fel!!</strong></p> : null;

            return (
                <div>
                    <h1>Hello there</h1>
                    <p>Logged in user: {this.props.profileName}</p>
                    {errorMessage}
                    <ul>{playlist}</ul>
                </div>
            );
        } else {
            return (<p>Loading..</p>);
        }
    }
}

const mapStateToProps = state => ({
    profileName: state.spotify.profileName,
    playlists: state.spotify.playlists,
    userId: state.spotify.userId,
    quiz: state.quiz.quiz,
    createQuizError: state.quiz.createQuizError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProfileAndPlaylists,
    createQuiz,
    resetGame,
    launchGame: () => push('/gamehost'),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);