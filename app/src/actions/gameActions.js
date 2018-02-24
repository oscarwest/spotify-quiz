import * as actionTypes from './actionTypes';
import GameApi from '../api/gameApi';


export const createGame = (playlistId) => {
    return dispatch => {
        // Request API
        dispatch({
            type: actionTypes.CREATE_GAME_REQUESTED
        });

        return GameApi.createGame()
            .then(game => {
                // If the request goes well
                // Also update state
                dispatch({
                    type: actionTypes.CREATE_GAME_SUCCESS,
                    response: 'Awesome game'
                });

            }).catch(error => {

                // If the request goes wrong
                // Also update state
                dispatch({
                    type: actionTypes.CREATE_GAME_FAILURE,
                    error: error
                });
            });
    };
};


