
export const CREATE_GAME_REQUESTED = 'game/CREATE_GAME_REQUESTED';
export const CREATE_GAME = 'game/CREATE_GAME';


const initialState = {
    game: null,
    isCreatingGame: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME_REQUESTED:
            return {
                ...state,
                isCreatingGame: true
            };
        case CREATE_GAME:
            return {
                ...state,
                isCreatingGame: !state.isCreatingGame
            };

        default:
            return state;
    }
};

export const create_game = () => {
    return dispatch => {
        dispatch({
            type: CREATE_GAME_REQUESTED
        });

        dispatch({
            type: CREATE_GAME
        });
    };
};

export const create_gameAsync = () => {
    return dispatch => {
        dispatch({
            type: CREATE_GAME_REQUESTED
        });

        return setTimeout(() => {
            dispatch({
                type: CREATE_GAME
            });
        }, 3000);
    };
};

