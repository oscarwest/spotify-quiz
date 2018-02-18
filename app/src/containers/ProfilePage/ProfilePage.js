import React, { Component } from 'react';
import PlaylistsComponent from '../../components/PlaylistsComponent/PlaylistsComponent';
import * as rp from 'request-promise';

class ProfilePage extends Component {
    state = { profile_name: null };

    async componentDidMount() {
        // const access_token = localStorage.getItem('access_token');
        // console.log("using token: " + access_token);
        const profile = await this.getProfile();
        this.setState({
            profile_name: profile.display_name,
            user_id: profile.id
        });

        const playlists = await this.getPlaylists();
        this.setState({
            playlists: playlists.items.map(p => {
                return {
                    name: p.name,
                    id: p.id
                };
            })
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

    getPlaylists() {
        return new Promise((resolve, reject) => {
            const opts = {
                method: 'GET',
                url: `https://api.spotify.com/v1/users/${this.state.user_id}/playlists`,
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
        if (this.state.profile_name && this.state.playlists) {
            return (
                <div>
                    <h1>Profile page</h1>
                    <p>Welcome: {this.state.profile_name}</p>
                    <PlaylistsComponent playlists={this.state.playlists} />
                </div>
            );
        } else {
            return (<p>Loading...</p>);
        }
    }
}

export default ProfilePage;
