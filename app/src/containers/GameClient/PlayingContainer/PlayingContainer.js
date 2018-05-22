import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PlayingContainer extends Component {


    render() {
        const redirect = this.props.users.length < 1;

        if (redirect) {
            return <Redirect to="/" />;
        }

        if (this.props.gameStarted) {
            return (
                <div>
                    <p>swipe or something</p>
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
    gameStarted: state.websocket.gameStarted,
    users: state.websocket.users
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayingContainer);
