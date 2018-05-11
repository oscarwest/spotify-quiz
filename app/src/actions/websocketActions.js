import * as actionTypes from './actionTypes';

export const createGame = (quiz) =>  {
  return (dispatch, getState, {emit}) => {
    emit(actionTypes.WS_CREATE_GAME, quiz)
  }
}

export const joinGame = (id, userName) =>  {
  return (dispatch, getState, {emit}) => {
    emit(actionTypes.WS_JOIN_GAME, {id: id, userName: userName})
  }
}

export const startGame = (game) =>  {
  return (dispatch, getState, {emit}) => {
    emit(actionTypes.WS_START_GAME, game)
  }
}
