import * as actionTypes from '../actions/actionTypes';


const initialState = {
    quiz: null,
    isCreatingQuiz: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_QUIZ_REQUESTED:
            return {
                ...state,
                isCreatingQuiz: true
            };
        case actionTypes.CREATE_QUIZ_SUCCESS:
            return {
                ...state,
                isCreatingQuiz: false,
                quiz: action.response
            };

        case actionTypes.CREATE_QUIZ_FAILURE:
            return {
                ...state,
                isCreatingQuiz: false,
                createQuizError: action.error
            };

        case actionTypes.RESET_QUIZ:
            return {
                ...state,
                isCreatingQuiz: false,
                quiz: null,
                createQuizError: null
            };

        default:
            return state;
    }
};
