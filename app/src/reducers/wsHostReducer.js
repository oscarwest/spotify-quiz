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
            if (!state.game) return {...state};
            return {
                ...state,
                users: [...state.users,
                    {
                        name: JSON.parse(action.payload).userName,
                        answers: new Array(state.game.quiz.questions.length).fill(null)
                    }]
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
        case actionTypes.WS_CLIENT_ANSWER_RESPONSE:
            if (!state.users) return {...state};
            var payload = JSON.parse(action.payload);
            console.log('action payload', action.payload, key);

            const key = state.users.findIndex(i => i.name === payload.userName);
            return {
                ...state,
                users: state.users.map((user, index) => {
                    if(index !== key) {
                        return user;
                    }
                    
                    
                    return {
                        name: user.name,
                        answers: user.answers.map((answer, index) => {
                            console.log('in answer index ', index);
                            if (index !== payload.answer) {
                                console.log('wat1');
                                return answer;
                            }

                            console.log('wat2');
                            return payload.question;
                        })
                    }
                })
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
