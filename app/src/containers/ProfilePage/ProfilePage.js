import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as rp from 'request-promise';

class ProfilePage extends Component {
    state = { profile_name: '' };

    componentWillMount() {
        // const access_token = localStorage.getItem('access_token');
        // console.log("using token: " + access_token);

        this.getProfile().then((result) => {
            this.setState({
                profile_name: result.display_name
            });
        });
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            const opts = {
                method: 'GET',
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
                json: true,
            };

            try {
                rp(opts).then((res) => {
                    resolve(res);
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Profile page</h1>
                <p>Welcome: {this.state.profile_name}</p>
            </div>
        );

    }
}

export default ProfilePage;
