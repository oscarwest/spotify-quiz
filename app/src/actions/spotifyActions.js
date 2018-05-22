import * as actionTypes from './actionTypes';
import SpotifyApi from '../api/spotifyApi';

export const getProfile = () => {
    return async dispatch => {
        dispatch({ type: actionTypes.SPOTIFY_PROFILE_REQUESTED });

        try {
            const profile = await SpotifyApi.getProfile();
            dispatch({
                type: actionTypes.SPOTIFY_PROFILE_SUCCESS,
                response: profile
            });
        } catch (error) {
            dispatch({
                type: actionTypes.SPOTIFY_PROFILE_FAILURE,
                error: error
            });
        }
    };
};

export const getPlaylists = (userId) => {
    return async dispatch => {
        dispatch({ type: actionTypes.PLAYLISTS_REQUESTED });

        try {
            const playlists = await SpotifyApi.getPlaylists(userId);
            dispatch({
                type: actionTypes.PLAYLISTS_SUCCESS,
                response: playlists
            });

        } catch (error) {
            dispatch({
                type: actionTypes.PLAYLISTS_FAILURE,
                error: error
            });
        }
    };
};

export const getProfileAndPlaylists = () => {
    return async (dispatch, getState) => {
        await dispatch(getProfile());
        const userId = getState().spotify.userId;

        return dispatch(getPlaylists(userId));
    };
};