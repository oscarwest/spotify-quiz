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

            rp(opts)
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    static getPlaylists(userId) {
        return new Promise((resolve, reject) => {
            const opts = {
                method: 'GET',
                url: `https://api.spotify.com/v1/users/${userId}/playlists`,
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
                            id: p.id,
                            ownerId: p.owner.id,
                            imageUrl: p.images[0].url
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