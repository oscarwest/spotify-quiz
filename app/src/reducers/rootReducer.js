import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import quiz from './quizReducer';
import spotify from './spotifyReducer';
import wsHostReducer from './wsHostReducer';
import wsClientReducer from './wsClientReducer';

export default combineReducers({
    routing: routerReducer,
    quiz,
    spotify,
    wsHostReducer,
    wsClientReducer
});
