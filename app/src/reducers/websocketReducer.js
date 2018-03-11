import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    game: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WS_GAME_CREATED:
            return {
                ...state,
                game: JSON.parse(action.payload),
                users: [...state.users, 'me']
            };
        case actionTypes.WS_USER_JOINED_GAME:
            return {
                ...state,
                game: JSON.parse(action.payload),
                users: [...state.users, JSON.parse(action.payload).userName]
            };

        default:
            return state;
    }
};
