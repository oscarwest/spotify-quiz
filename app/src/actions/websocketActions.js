import * as actionTypes from './actionTypes';

export const createGame = (quiz) =>  {
    return (dispatch, getState, {emit}) => {
      emit(actionTypes.WS_CREATE_GAME, quiz)
    }
}

export const joinGame = (id) =>  {
  return (dispatch, getState, {emit}) => {
    emit(actionTypes.WS_JOIN_GAME, id)
  }
}
