import React, { Component } from 'react';

class LoginPage extends Component {
    login() {
        fetch('http://localhost:8888/auth/login', { redirect: 'follow' })
            .then(res => {
                console.log(res.url);
                //window.location = res.url;
            })
            .catch({

            });
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
