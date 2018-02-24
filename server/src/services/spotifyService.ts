'use strict';

import * as rp from 'request-promise';
import * as config from 'config';
import { Song } from '../models/song';

export class SpotifyService {
  private clientId : string;
  private clientSecret : string;
  private redirectUri : string;
  private tokenUrl : string;

  constructor() {
    this.clientId = config.get('spotify.client_id');
    this.clientSecret = config.get('spotify.client_secret');
    this.redirectUri = config.get('spotify.redirect_uri');
    this.tokenUrl = config.get('spotify.token_url');
  }

  public async getSongs(userId: string, playlistId: string) : Promise<Song[]> {
    const token = await this.getAccessToken();
        // use the access token to access the Spotify Web API
    const fieldsParams = 'fields=items(track(id%2C%20name%2C%20artists(name)))';
    const opts = {
      method: 'GET',
      url: 'https://api.spotify.com/v1/users/' + userId + '/playlists/'
            + playlistId + '/tracks?'
            + fieldsParams,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
    };

    try {
      const res = await rp(opts);

      const songs = res.items.map((item: any) => {
            	return new Song(
              {
                artistName: item.track.artists[0].name,
                id: item.track.id,
                trackName: item.track.name,
              },
              );
      });

      return Promise.resolve(songs);
    } catch (error) {
      console.log(error);
      return Promise.reject('Couldn\'t get songs');
    }
  }

  private async getAccessToken() : Promise<string> {
    const opts = {
      method: 'POST',
      url: this.tokenUrl,
      headers: {
        Authorization: 'Basic ' + (new Buffer(
            this.clientId + ':' + this.clientSecret).toString('base64')
          ),
      },
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
    };

    try {
      const res = await rp(opts);
      return Promise.resolve(res.access_token);
    } catch (error) {
      console.log(error);
    }
  }
}
