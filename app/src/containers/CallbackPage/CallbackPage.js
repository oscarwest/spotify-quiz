import { Component } from 'react';

const stateKey = 'spotify_auth_state';
class CallbackPage extends Component {
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

    componentWillMount() {
        const params = this.getHashParams();
        const access_token = params.access_token;
        // const state = params.state;
        // const storedState = localStorage.getItem(stateKey);

        localStorage.setItem('access_token', access_token);
        window.location = 'http://localhost:3000/profile';
    }

    render() {
        return null;
    }
}

export default CallbackPage;
