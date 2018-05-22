import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createGame, launchGame } from '../../../actions/websocketActions';

class GameHostPage extends Component {
    constructor(props) {
        super(props);
        if (!this.props.quiz) {
            this.props.redirect();
        }
        this.props.createGame(this.props.quiz);
    }

    launchGameClick = (event) => {
        this.props.launchGame(this.props.game.id);
        event.preventDefault();
    }

    render() {
        const listItems = this.props.users.map((item, index) =>
            <li key={index}>
                {item}
            </li>
        );

        if (this.props.game) {
            if (this.props.gameStarted) {
                return (
                    <div>
                        {/* <h1>Question {this.props.game. </h1> */}
                        <p>game running...</p>

                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>Game Host</h1>
                        <br />
                        <h2>{this.props.game.id}</h2>
                        <ul>{listItems}</ul>
                        <button onClick={this.launchGameClick} disabled={this.props.users.length < 1}>Start Game</button>
                    </div>
                );
            }
        } else {
            return <p>Loading...</p>;
        }
    }
}

const mapStateToProps = state => ({
    quiz: state.quiz.quiz,
    game: state.websocket.game,
    gameStarted: state.websocket.gameStarted,
    users: state.websocket.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createGame,
    launchGame,
    redirect: () => push('/profile')
}, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameHostPage);

