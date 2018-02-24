import * as uuid from 'uuid';
import { Song } from './song';

export class Question {
  songs : [Song, Song, Song, Song];
  answer : number;

  constructor(data: Question | {} = {}) {
    Object.assign(this, data);

    if (!this.songs) {
      throw 'no songs';
    }
  }
}
