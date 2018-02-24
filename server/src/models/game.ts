import * as shortid from 'shortid';
import * as uuid from 'uuid';
import { Question } from './question';
import { Quiz } from '../models/quiz';

export class Game {
  id = '';
  quiz : Quiz = null;
  // shortId = '';

  constructor(data: Game | {} = {}) {
    Object.assign(this, data);
    // if (!this.id) {
    //   this.id = uuid.v4();
    // }

    if (!this.id) {
      this.id = shortid.generate().toUpperCase();
    }

  }
}
