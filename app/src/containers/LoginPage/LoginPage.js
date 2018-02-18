import React, { Component } from 'react';

const stateKey = 'spotify_auth_state';

class LoginPage extends Component {
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

    login() {
        const client_id = 'eff83e6b5dfe489092cde0ec5f788a4c'; // Your client id
        const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

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
}

export default LoginPage;
