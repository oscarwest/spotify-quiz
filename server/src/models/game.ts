import * as shortid from 'shortid';
import * as uuid from 'uuid';
import { Question } from './question';
import { Quiz } from '../models/quiz';

export class Game {
  id = '';
  quiz : Quiz = null;
  state : GameState = null;

  constructor(data: Game | {} = {}) {
    Object.assign(this, data);

    if (!this.id) {
      this.id = shortid.generate().toUpperCase();
    }

  }
}

export class GameState {
  status : GameStatus = null;
  currentQuestion = 0;
  players : Player[];
}

export class Player {
  username = '';
  score = 0;
}

enum GameStatus {
  WAITING,
  STARTED,
  RUNNING,
  STOPPED,
  PAUSED,
}
