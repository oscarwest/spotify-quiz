import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createGame, launchGame, gameTick, nextQuestion } from '../../../actions/websocketActions';

class GameHostPage extends Component {
    constructor(props) {
        super(props);

        if (!this.props.quiz) {
            this.props.redirect();
        }

        this.props.createGame(this.props.quiz);
    }
    
    componentWillUnmount = () => {
        clearInterval(this.timerID);
    }

    launchGameClick = (event) => {
        this.props.launchGame(this.props.game.id);
        event.preventDefault();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (!prevProps.gameStarted && this.props.gameStarted && this.props.currentQuestion === 0) {
            // Start Timer for first question
            this.tick();
        }

        if (prevProps.gameStarted && prevProps.currentQuestion < this.props.currentQuestion) {
            this.tick();
        }

        if (this.props.counter === 5) {
            this.props.nextQuestion(this.props.game.id, this.props.currentQuestion + 1);
        }
    }

    tick = () => {
        setInterval(() => {
            this.props.gameTick();
            },
            1000
        );
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
                        <p>{this.props.counter}</p>
                        <p>Current Question: {this.props.currentQuestion}</p>
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
    counter: state.websocket.counter,
    currentQuestion: state.websocket.currentQuestion
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createGame,
    launchGame,
    gameTick,
    nextQuestion,
    redirect: () => push('/profile')
}, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameHostPage);

