import * as actionTypes from '../actions/actionTypes';


const initialState = {
    game: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WS_GAME_CREATED:
            return {
                ...state,
                game: JSON.parse(action.payload)
            };

        default:
            return state;
    }
};

