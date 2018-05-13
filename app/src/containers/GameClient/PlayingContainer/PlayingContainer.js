import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PlayingContainer extends Component {
    render() {
        return (
            <div>
                <h1>Playing container component</h1>
                <p>waiting for game to start...</p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(PlayingContainer);
