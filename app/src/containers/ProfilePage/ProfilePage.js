import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as rp from 'request-promise';

class ProfilePage extends Component {
    getProfile() {
        return new Promise((resolve, reject) => {
            const opts = {
                method: 'GET',
                url: "https://api.spotify.com/v1/me",
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem("access_token"),
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
        const access_token = localStorage.getItem("access_token");
        // console.log("using token: " + access_token);

        const profileData = this.getProfile().then((result) => {
            return (
                <div>
                    <h1>Profile page</h1>
                    <p>Welcome: {profileData.display_name}</p>
                </div>
            );
        });

        console.log(profileData);

        return (
            <div>
                <h1>Profile page</h1>
            </div>
        );

    }
}

export default ProfilePage;
