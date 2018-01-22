'use strict';

import { Request, Response, NextFunction } from 'express';
import * as request from 'request';
import * as querystring from 'querystring';
import * as authSettings from '../authSettings';

const CLIENT_ID = authSettings.AuthSettings.CLIENT_ID;
const CLIENT_SECRET = authSettings.AuthSettings.CLIENT_SECRET;
const REDIRECT_URI = authSettings.AuthSettings.REDIRECT_URI;
const stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * GET /login
 * Login page.
 */
export let getLogin = (req: Request, res: Response) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      scope,
      state,
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
    }));
};

export let authCallback = (req: Request, res: Response) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch',
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: 'Basic ' + (
          new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        ),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            Authorization: 'Bearer ' + access_token},
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token,
            refresh_token,
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token',
          }));
      }
    });
  }
};

export let refreshToken = (req: Request, res: Response) => {

  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers:
    {
      Authorization: 'Basic ' + (
        new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      ),
    },
    form: {
      refresh_token,
      grant_type: 'refresh_token',
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token,
      });
    }
  });
};

export let logout = (req: Request, res: Response) => {
  res.redirect(200, '/');
};
