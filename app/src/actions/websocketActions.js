import * as actionTypes from './actionTypes';

export const createGame = (quiz) =>  {
    return (dispatch, getState, {emit}) => {
      emit(actionTypes.WS_CREATE_GAME, quiz)
    }
}
