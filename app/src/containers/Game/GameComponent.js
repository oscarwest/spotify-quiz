import React from 'react';
import WebSocketComponent from '../../components/WebSocketComponent';
import JoinGame from '../JoinGame/JoinGame';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    create_game,
    create_gameAsync
} from '../../modules/game';

class GameComponent extends WebSocketComponent {
    render() {
        return (
            <div>
                <h1>Game Component</h1>
                <JoinGame />
                <button onClick={() => this.props.changePage()}>Go to login page via redux</button>
                <button onClick={this.props.create_gameAsync} disabled={this.props.isCreatingGame}>Create game</button>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isCreatingGame: state.game.isCreatingGame
});

const mapDispatchToProps = dispatch => bindActionCreators({
    create_game,
    create_gameAsync,
    changePage: () => push('/login')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent);
