import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import game from './gameReducer';

export default combineReducers({
    routing: routerReducer,
    game
});
