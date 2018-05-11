import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createGame, startGame } from '../../../actions/websocketActions';

class GameHostPage extends Component {
    constructor(props) {
        super(props);
        this.props.createGame(this.props.quiz);
    }

    startGameClick = (event) => {
        this.props.startGame(this.props.quiz);
        event.preventDefault();
    }

    render() {
        const listItems = this.props.users.map((item, index) =>
            <li key={index}>
                {item}
            </li>
        );

        if (this.props.game) {
            return (
                <div>
                    <h1>Game Host</h1>
                    <br />
                    <h2>{this.props.game.id}</h2>
                    <ul>{listItems}</ul>
                    <button onClick={this.startGameClick}>Start Game</button>
                </div>
            );
        } else {
            return <p>Loading...</p>;
        }
    }
}

const mapStateToProps = state => ({
    quiz: state.quiz.quiz,
    game: state.websocket.game,
    users: state.websocket.users
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createGame,
    startGame
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameHostPage);
