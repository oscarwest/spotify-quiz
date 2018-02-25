import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import game from './gameReducer';
import spotify from './spotifyReducer';

export default combineReducers({
    routing: routerReducer,
    game,
    spotify
});
