import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    game: null,
    gameStarted: false,
    currentQuestion: 0,
    counter: 0
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
                currentQuestion: JSON.parse(action.payload).questionNumber,
                counter: 0,
                gameStarted: true
            }
        case actionTypes.WS_NEXT_QUESTION_RESPONSE:
            return {
                ...state,
                counter: 0,
                currentQuestion: JSON.parse(action.payload).questionNumber
            }
        case actionTypes.WS_CLIENT_ANSWER:
            return {
                ...state,
                currentQuestion: JSON.parse(action.payload).questionNumber
            }
        case actionTypes.GAME_TICK:
            return {
                ...state,
                counter: state.counter + 1
            }

        default:
            return state;
    }
};
