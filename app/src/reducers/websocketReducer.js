import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    game: null,
    gameStarted: false,
    currentQuestion: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WS_GAME_CREATED:
            return {
                ...state,
                gameStarted: false,
                users: [],
                game: JSON.parse(action.payload)
            };
        case actionTypes.WS_USER_JOINED_GAME:
            return {
                ...state,
                users: [...state.users, JSON.parse(action.payload).userName]
            };
        case actionTypes.WS_GAME_STARTED:
            return {
                ...state,
                gameStarted: true
            }
        case actionTypes.WS_NEXT_QUESTION:
            return {
                ...state,
                currentQuestion: JSON.parse(action.payload).questionNumber
            }

        default:
            return state;
    }
};
