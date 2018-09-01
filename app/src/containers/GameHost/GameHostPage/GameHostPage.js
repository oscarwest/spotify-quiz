import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, LargePageTitle, LargePageSubtitle } from '../../assets/styles';
import Button from '../../../components/ButtonComponent/ButtonComponent';
import { createGame, launchGame, gameTick, nextQuestion } from '../../../actions/websocketActions';
import styled from 'styled-components';

const PlayerName = styled.p`
    font-size: 30px;
    margin: 0;
    color: black;
`;

const PlayerContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    min-height: 300px;
    width: 400px;
    margin: auto;
    padding: 5px;
    margin-bottom: 20px;

    h3 {
        margin-bottom: 10px 0;
    }
`;


class GameHostPage extends Component {
    refreshIntervalId = null;
    audio = null;

    constructor(props) {
        super(props);
        this.audio = new Audio();

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
        let curr = this.props.currentQuestion;
        let questionAnswerIndex = this.props.game.quiz.questions[curr].answer;
        let playingSong = this.props.game.quiz.questions[curr].songs[questionAnswerIndex];
        console.log('questionAnswerIndex: ', questionAnswerIndex);
        console.log('playingSong', playingSong);
        

        if (!prevProps.gameStarted && this.props.gameStarted && curr === 0) {
            // Start Timer for first question
            this.tick();

            this.audio.pause();
            this.audio.src = playingSong.previewUrl;
            this.audio.play();
        }

        if (prevProps.gameStarted && prevProps.currentQuestion < curr) {
            // start timer for new question
            this.tick();

            this.audio.pause();
            this.audio.src = playingSong.previewUrl;
            this.audio.play();
        }

        if (this.props.counter === 5) {
            clearInterval(this.refreshIntervalId);
            if (this.props.game && curr < this.props.game.quiz.questions.length) {
                setTimeout(() => {
                    this.props.nextQuestion(this.props.game.id, curr + 1);
                }, 1000);
            } else {
                // game ended
                console.log('Game ended');
            }
        }
    }

    tick = () => {
        this.refreshIntervalId = setInterval(() => {
            this.props.gameTick();
        },
            1000
        );
    }

    render() {
        const players = this.props.users.map((item, index) =>
            <PlayerName key={index}>
                {item}
            </PlayerName>
        );

        if (this.props.game) {
            if (this.props.gameStarted) {
                return (
                    <Container>
                        <p>{this.props.counter}</p>
                        <p>Current Question: {this.props.currentQuestion}</p>
                        <p>game running...</p>
                    </Container>
                );
            } else {
                return (
                    <Container>
                        <LargePageTitle>{this.props.game.id}</LargePageTitle>
                        <LargePageSubtitle>Go to localhost:3000 to join game</LargePageSubtitle>
                        <PlayerContainer>
                            <h3>Joined players</h3>
                            {players}
                        </PlayerContainer>
                        <Button text="Start game" onClick={this.launchGameClick} disabled={this.props.users.length < 1} />
                    </Container>
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
    currentQuestion: state.websocket.currentQuestion,
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

