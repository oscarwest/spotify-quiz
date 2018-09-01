import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { joinGame } from '../../actions/websocketActions';
import TextInput from '../../components/TextInputComponent/TextInputComponent';
import Button from '../../components/ButtonComponent/ButtonComponent';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
`;

const JoinForm = styled.form`
    display: flex;
    flex-direction: column;
`;

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { gameId: '', userName: '' };

        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeId(e) {
        this.setState({ gameId: e.target.value });
    }

    handleChangeUserName(e) {
        this.setState({ userName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.joinGame(this.state.gameId, this.state.userName);
        this.props.playingPage();
    }

    render() {
        return (
            <FormContainer>
                <h1>HomeComponent</h1>
                <h2>Join a game</h2>
                <JoinForm>
                    <TextInput placeholder="Game ID" value={this.state.gameId} onChange={this.handleChangeId} maxLength={9} />
                    <br />
                    <TextInput placeholder="User alias" value={this.state.userName} onChange={this.handleChangeUserName} maxLength={9} />
                    <br />
                    <Button text="Join game!" type="submit" disabled={this.state.gameId.length < 9 || this.state.userName.length < 3} onClick={this.handleSubmit} />
                </JoinForm>
                <h4>... or create a new game</h4>
                <Button text="Create game" onClick={() => this.props.loginPage()} />
            </FormContainer>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    joinGame,
    playingPage: () => push('/playing'),
    loginPage: () => push('/login')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(HomeComponent);