import React, { Component } from 'react';
import * as rp from 'request-promise';

class ProfilePage extends Component {
    state = { profile_name: null };

    componentDidMount() {
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
        if (this.state.profile_name) {
            return (
                <div>
                    <h1>Profile page</h1>
                    <p>Welcome: {this.state.profile_name}</p>
                </div>
            );
        } else {
            return (<p>Loading...</p>);
        }
    }
}

export default ProfilePage;
