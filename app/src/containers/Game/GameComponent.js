import React from 'react';
import WebSocketComponent from '../../components/WebSocketComponent';
import JoinGame from '../JoinGame/JoinGame';

class GameComponent extends WebSocketComponent {
    render() {
        return (
            <div>
                <h1>Game Component</h1>
                <JoinGame />
            </div>
        );
    }
}

export default GameComponent;
