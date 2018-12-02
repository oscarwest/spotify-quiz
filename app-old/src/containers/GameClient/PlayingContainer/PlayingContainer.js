import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { answerQuestion } from '../../../actions/websocketActions';

class PlayingContainer extends Component {
    a1() {
        this.props.answerQuestion(this.props.gameId, this.props.userName, this.props.currentQuestion, 0);
    }

    a2() {
        this.props.answerQuestion(this.props.gameId, this.props.userName, this.props.currentQuestion, 1);
    }

    a3() {
        this.props.answerQuestion(this.props.gameId, this.props.userName, this.props.currentQuestion, 2);
    }

    a4() {
        this.props.answerQuestion(this.props.gameId, this.props.userName, this.props.currentQuestion, 3);
    }

    render() {
        if (this.props.gameStarted) {
            return (
                <div>
                    <p>swipe or something</p>
                    <button onClick={() => this.a1()}>1</button>
                    <button onClick={() => this.a2()}>2</button>
                    <button onClick={() => this.a3()}>3</button>
                    <button onClick={() => this.a4()}>4</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Playing container component</h1>
                    <p>waiting for game to start...</p>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    gameStarted: state.wsClientReducer.gameStarted,
    currentQuestion: state.wsClientReducer.currentQuestion,
    userName: state.wsClientReducer.userName,
    gameId: state.wsClientReducer.gameId
});

const mapDispatchToProps = dispatch => bindActionCreators({
    answerQuestion
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayingContainer);
