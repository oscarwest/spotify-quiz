import * as actionTypes from './actionTypes';
import GameApi from '../api/gameApi';


export const createGame = (userId, playlistId) => {
    return dispatch => {
        // Request API
        dispatch({
            type: actionTypes.CREATE_GAME_REQUESTED
        });

        const payload = {
            playlistId,
            count: 10,
            userId: userId,
            quizName: 'SomeQuizName',
            description: 'some description',
        };

        return GameApi.createGame(payload)
            .then(game => {
                dispatch({
                    type: actionTypes.CREATE_GAME_SUCCESS,
                    response: game
                });


            }).catch(error => {
                dispatch({
                    type: actionTypes.CREATE_GAME_FAILURE,
                    error: error
                });
            });
    };
};


