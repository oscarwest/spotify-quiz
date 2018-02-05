import * as uuid from 'uuid';
import { Question } from './question';

export class Game {
  id = '';
  questions : Question[];

  constructor(data: Game | {} = {}) {
    Object.assign(this, data);
    if (!this.id) {
      this.id = uuid.v4();
    }
  }
}
