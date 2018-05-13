import React, { Component } from 'react';
// import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PlayingContainer extends Component {

    componentDidUpdate = (prev, nott) => {
        console.log('äasf');
        
    }

    render() {
        if (this.props.gameStarted) {
            return (
                <div>
                    <p>swipe or something</p>
                </div>
            )
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
    gameStarted: state.websocket.gameStarted
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayingContainer);
