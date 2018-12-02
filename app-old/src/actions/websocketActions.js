import * as actionTypes from './actionTypes';

export const createGame = (quiz) => {
  return (dispatch, getState, { emit }) => {
    emit(actionTypes.WS_CREATE_GAME, quiz);
  };
};

export const joinGame = (id, userName) => {
  return (dispatch, getState, { emit }) => {
    // Send Websocket request to Join game channel
    emit(actionTypes.WS_JOIN_GAME, { id, userName });

    // Dispatch event to set initial client state
    dispatch({
        type: actionTypes.SET_CLIENT_INITIAL_STATE,
        id: id,
        userName: userName
    });
  };
};

export const launchGame = (id) => {
  return (dispatch, getState, { emit }) => {
    emit(actionTypes.WS_LAUNCH_GAME, { id });
  };
};

export const gameTick = () => {
  return dispatch => {
      dispatch({
          type: actionTypes.GAME_TICK
      });
  };
};

export const nextQuestion = (id, questionNumber) => {
  return (dispatch, getState, { emit }) => {
      emit(actionTypes.WS_NEXT_QUESTION, { id, questionNumber });
  };
};

export const answerQuestion = (id, userName, questionNumber, answerIndex) => {
  return (dispatch, getState, { emit }) => {
      emit(actionTypes.WS_CLIENT_ANSWER, { id, userName, question: questionNumber, answer: answerIndex });
  };
};