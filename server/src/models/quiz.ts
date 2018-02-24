import * as uuid from 'uuid';
import { Question } from '../models/question';

export class Quiz {
  id = '';
  userId = '';
  name = '';
  description = '';
  questions : Question[];

  constructor(data: Quiz | {} = {}) {
    Object.assign(this, data);

    if (!this.id) {
      this.id = uuid.v4();
    }
  }
}
