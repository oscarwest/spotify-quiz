import * as actionTypes from './actionTypes';

export const createGame = (quiz) => {
  return (dispatch, getState, { emit }) => {
    emit(actionTypes.WS_CREATE_GAME, quiz);
  };
};

export const joinGame = (id, userName) => {
  return (dispatch, getState, { emit }) => {
    emit(actionTypes.WS_JOIN_GAME, { id, userName });
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