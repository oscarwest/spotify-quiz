import * as actionTypes from './actionTypes';
import GameApi from '../api/gameApi';


export const createQuiz = (userId, playlistId) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.CREATE_QUIZ_REQUESTED
        });

        const payload = {
            playlistId,
            count: 10,
            userId: userId,
            quizName: 'SomeQuizName',
            description: 'some description',
        };
        try {
            const game = await GameApi.createQuiz(payload);
            dispatch({
                type: actionTypes.CREATE_QUIZ_SUCCESS,
                response: game
            });
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_QUIZ_FAILURE,
                error: error
            });
        }
    };
};

export const resetGame = (userId, playlistId) => {
    return dispatch => {
        dispatch({
            type: actionTypes.RESET_QUIZ
        });
    };
};



