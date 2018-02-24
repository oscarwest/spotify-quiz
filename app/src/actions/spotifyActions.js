import * as actionTypes from './actionTypes';
import SpotifyApi from '../api/spotifyApi';

export const getProfile = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.SPOTIFY_PROFILE_REQUESTED
        });

        return SpotifyApi.getProfile()
            .then(profile => {
                dispatch({
                    type: actionTypes.SPOTIFY_PROFILE_SUCCESS,
                    response: profile
                });

            }).catch(error => {
                dispatch({
                    type: actionTypes.SPOTIFY_PROFILE_FAILURE,
                    error: error
                });
            });
    };
};

export const getPlaylists = (user_id) => {
    return dispatch => {
        dispatch({
            type: actionTypes.PLAYLISTS_REQUESTED
        });

        return SpotifyApi.getPlaylists(user_id)
            .then(playlists => {
                dispatch({
                    type: actionTypes.PLAYLISTS_SUCCESS,
                    response: playlists
                });

            }).catch(error => {
                dispatch({
                    type: actionTypes.PLAYLISTS_FAILURE,
                    error: error
                });
            });
    };
};

