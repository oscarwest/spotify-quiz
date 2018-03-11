import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GameHostPage extends Component {
    componentDidMount() {
        console.log('game host component: ', this.props.game);
    }
    render() {
        return (
            <h1>Game Host</h1>
        );
    }
}

const mapStateToProps = state => ({
    game: state.game.game,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameHostPage);
