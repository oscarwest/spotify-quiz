import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwipeArea from '../../../components/SwipeArea/SwipeArea';

class PlayingContainer extends Component {


    render() {
        if (this.props.gameStarted) {
            return (
                <SwipeArea />
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayingContainer);
