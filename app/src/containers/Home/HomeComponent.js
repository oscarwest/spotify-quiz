import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { joinGame } from '../../actions/websocketActions';

class HomeComponnet extends Component {
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
            <div>
                <h1>HomeComponent</h1>
                <h2>join game or login tyo create a new game</h2>
                <form>
                    <input placeholder="id" type="text" value={this.state.gameId} onChange={this.handleChangeId} maxLength="9" />
                    <br />
                    <input placeholder="username" type="text" value={this.state.userName} onChange={this.handleChangeUserName} maxLength="9" />
                    <button type="submit" disabled={this.state.gameId.length < 9 || this.state.userName.length < 3} onClick={this.handleSubmit}>Join!</button>
                </form>
                <button onClick={() => this.props.loginPage()}>Go to login page via redux</button>
            </div>
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
)(HomeComponnet);