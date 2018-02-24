import * as actionTypes from '../actions/actionTypes';


const initialState = {
    profile_name: null,
    isFetchingPlaylists: null,
    user_id: null,
    playlists: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SPOTIFY_PROFILE_REQUESTED:
            return {
                ...state,
                isFetchingProfile: true
            };
        case actionTypes.SPOTIFY_PROFILE_SUCCESS:
            return {
                ...state,
                isFetchingProfile: false,
                profile_name: action.response.display_name,
                user_id: action.response.id
            };

        case actionTypes.SPOTIFY_PROFILE_FAILURE:
            return {
                ...state,
                isFetchingProfile: false
            };
        case actionTypes.PLAYLISTS_REQUESTED:
            return {
                ...state,
                isFetchingPlaylists: true
            };
        case actionTypes.PLAYLISTS_SUCCESS:
            return {
                ...state,
                isFetchingPlaylists: false,
                playlists: action.response
            };

        case actionTypes.PLAYLISTS_FAILURE:
            return {
                ...state,
                isFetchingPlaylists: false
            };

        default:
            return state;
    }
};

