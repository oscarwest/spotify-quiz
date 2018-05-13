import * as shortid from 'shortid';
import * as uuid from 'uuid';
import { Question } from './question';
import { Quiz } from '../models/quiz';

export class Game {
  id = '';
  quiz : Quiz = null;
  // state : GameState = new GameState();

  constructor(data: Game | {} = {}) {
    Object.assign(this, data);

    if (!this.id) {
      this.id = shortid.generate().toUpperCase();
    }

  }
}

// export class GameState {
//   status : GameStatus = GameStatus.CREATED;
//   currentQuestion = 0;
//   players : Player[];

//   constructor(data: GameState | {} = {}) {
//     Object.assign(this, data);

//     this.players = [];
//   }
// }

// export class Player {
//   username = '';
//   score = 0;
// }

// enum GameStatus {
//   CREATED,
//   WAITING,
//   STARTED,
//   RUNNING,
//   STOPPED,
// }
