'use strict';

import * as rp from 'request-promise';
import { Game } from '../models/game';

export class GameService {
  // private clientId : string;

  constructor() {
    // this.clientId = config.get('spotify.client_id');
  }

  public async createGame(userId: string, playlistId: string) : Promise<Game> {
    return Promise.resolve(new Game());
  }
}
