import React, { Component } from 'react';
import * as qs from 'query-string';

const stateKey = 'spotify_auth_state';
class CallbackPage extends Component {
    render() {
        const params = this.getHashParams();
        console.log(params);

        const access_token = params.access_token,
            state = params.state,
            storedState = localStorage.getItem(stateKey);

        localStorage.setItem("access_token", access_token);

        window.location = "http://localhost:3000/profile";

        return;
    }

    getHashParams() {
        const hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        return hashParams;
    }
}

export default CallbackPage;
