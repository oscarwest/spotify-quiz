import * as rp from 'request-promise';

class SpotifyApi {
    static getProfile() {
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
                reject(error);
            }
        });
    }

    static getPlaylists(user_id) {
        return new Promise((resolve, reject) => {
            const opts = {
                method: 'GET',
                url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
                json: true,
            };

            try {
                rp(opts).then((res) => {
                    resolve(res.items.map(p => {
                        return {
                            name: p.name,
                            id: p.id
                        };
                    }));
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default SpotifyApi;