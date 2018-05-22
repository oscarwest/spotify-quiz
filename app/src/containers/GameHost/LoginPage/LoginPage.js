import React, { Component } from 'react';

const stateKey = 'spotify_auth_state';

class LoginPage extends Component {
    componentWillMount() {
        const params = this.getHashParams();
        const access_token = params.access_token;

        if (access_token) {
            localStorage.setItem('access_token', access_token);
            window.location = 'http://localhost:3000/profile';
        }
    }

    getHashParams() {
        let e;
        const hashParams = {};
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        return hashParams;
    }

    login() {
        const client_id = 'eff83e6b5dfe489092cde0ec5f788a4c'; // Your client id
        const redirect_uri = 'http://localhost:3000/login'; // Your redirect uri

        const state = this.generateRandomString(16);

        localStorage.setItem(stateKey, state);
        const scope = 'user-read-private user-read-email';

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location = url;
    };

    generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    render() {
        return (
            <div>
                <h1>Login here</h1>
                <button onClick={() => this.login()}>
                    Log in with Spotify
                </button>
            </div>
        );
    }
}

export default LoginPage;
