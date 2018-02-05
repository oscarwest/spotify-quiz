import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JoinGame extends Component {
    render() {
        return (
            <div>
                <h1>join game here!</h1>
                <input maxlength="4" />
                <button>Join!</button>
                <p>Or <Link to="/login">create</Link> a new game.</p>
            </div>
        );
    }
}

export default JoinGame;
