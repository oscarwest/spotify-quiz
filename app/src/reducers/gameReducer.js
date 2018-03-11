import * as actionTypes from '../actions/actionTypes';


const initialState = {
    game: null,
    isCreatingGame: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_GAME_REQUESTED:
            return {
                ...state,
                isCreatingGame: true
            };
        case actionTypes.CREATE_GAME_SUCCESS:
            return {
                ...state,
                isCreatingGame: false,
                game: action.response
            };

        case actionTypes.CREATE_GAME_FAILURE:
            return {
                ...state,
                isCreatingGame: false,
                createGameError: action.error
            };

        case actionTypes.RESET_GAME:
            return {
                ...state,
                isCreatingGame: false,
                game: null,
                createGameError: null
            };


        default:
            return state;
    }
};

