import React, { Component } from 'react';
import JoinGame from '../JoinGame/JoinGame';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GameComponent extends Component {
    render() {
        return (
            <div>
                <h1>Game Component</h1>
                <JoinGame />
                <button onClick={() => this.props.changePage()}>Go to login page via redux</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(GameComponent);
