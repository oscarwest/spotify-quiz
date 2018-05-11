import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import quiz from './quizReducer';
import spotify from './spotifyReducer';
import websocket from './websocketReducer';

export default combineReducers({
    routing: routerReducer,
    quiz,
    spotify,
    websocket
});
