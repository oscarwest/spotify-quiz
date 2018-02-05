'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import * as querystring from 'querystring';
import * as config from 'config';
import * as stringHelpers from '../helpers/stringHelpers';
import { SpotifyService } from '../services/spotifyService';

const router = Router();

const CLIENT_ID = config.get('spotify.client_id');
const CLIENT_SECRET = config.get('spotify.client_secret');
const REDIRECT_URI = config.get('spotify.redirect_uri');
const stateKey = 'spotify_auth_state';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.query.userId;
  const playlistId = req.query.playlistId;

  const service = new SpotifyService();

  try {
    const data = await service.getSongs(userId, playlistId);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});


export = router;
