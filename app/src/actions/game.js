import * as actionTypes from './actionTypes';


export const create_game = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_GAME_REQUESTED
        });

        dispatch({
            type: actionTypes.CREATE_GAME
        });
    };
};

export const create_gameAsync = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_GAME_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: actionTypes.CREATE_GAME
            });
        }, 3000);
    };
};
