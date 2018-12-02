import * as actionTypes from '../actions/actionTypes';

const initialState = {
    gameStarted: false,
    currentQuestion: 0,
    userName: null,
    gameId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WS_GAME_STARTED:
            return {
                ...state,
                currentQuestion: JSON.parse(action.payload).questionNumber,
                gameStarted: true
            }
        case actionTypes.WS_NEXT_QUESTION_RESPONSE:
            return {
                ...state,
                currentQuestion: JSON.parse(action.payload).questionNumber
            }
        // case actionTypes.WS_CLIENT_ANSWER:
        //     return {
        //         ...state,
        //         currentQuestion: JSON.parse(action.payload).questionNumber
        //     }
        case actionTypes.WS_JOIN_GAME:
            return {
                ...state,
                currentQuestion: JSON.parse(action.payload).questionNumber
            }
        case actionTypes.SET_CLIENT_INITIAL_STATE:
            return {
                ...state,
                gameId: action.id,
                userName: action.userName
            }
        default:
            return state;
    }
};
