import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { joinGame } from '../../../actions/websocketActions';
import { push } from 'react-router-redux';

class JoinGame extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', userName: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleChange2(e) {
        this.setState({ userName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.joinGame(this.state.value, this.state.userName);
        this.props.playingPage();
    }

    render() {
        return (
            <div>
                <h1>join game here!</h1>
                <form>
                    <input placeholder="id" type="text" value={this.state.value} onChange={this.handleChange} maxLength="9" />
                    <br/>
                    <input placeholder="username" type="text" value={this.state.userName} onChange={this.handleChange2} maxLength="9" />
                    <button type="submit" disabled={this.state.value.length < 9 || this.state.userName.length < 3} onClick={this.handleSubmit}>Join!</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    joinGame,
    playingPage: () => push('/playing')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGame);
