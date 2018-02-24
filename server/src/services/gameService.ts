'use strict';

import * as rp from 'request-promise';
import { Game } from '../models/game';
import { Quiz } from '../models/quiz';

export class GameService {
  // private clientId : string;

  constructor() {
    // this.clientId = config.get('spotify.client_id');
  }

  public async createGame(quiz: Quiz) : Promise<Game> {
    return Promise.resolve(new Game({ quiz }));
  }
}
