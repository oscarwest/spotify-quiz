import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistComponent from '../PlaylistComponent/PlaylistComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    createQuiz,
    resetGame
} from '../../actions/quizActions';

class PlaylistsComponent extends Component {
    constructor(props) {
        super(props);
        this.handleOnPlaylistClicked = this.handleOnPlaylistClicked.bind(this);
    }

    componentWillMount() {
        this.props.resetGame();
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
        const playlist = this.props.playlists.map((p, i) => {
            return <PlaylistComponent key={i} name={p.name} id={p.id} ownerId={p.ownerId} onPlaylistClicked={this.handleOnPlaylistClicked} />;
        });

        const errorMessage = this.props.createQuizError ?
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
    quiz: state.quiz.quiz,
    createQuizError: state.quiz.createQuizError
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createQuiz,
    resetGame,
    launchGame: () => push('/gamehost'),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistsComponent);
