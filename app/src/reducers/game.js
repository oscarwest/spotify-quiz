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
        case actionTypes.CREATE_GAME:
            return {
                ...state,
                isCreatingGame: !state.isCreatingGame
            };

        default:
            return state;
    }
};

