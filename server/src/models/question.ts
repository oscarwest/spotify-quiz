import * as uuid from 'uuid';
import { Song } from './song';

export class Question {
  song : [Song, Song, Song, Song];
  answer : number;

  constructor(data: Question | {} = {}) {
    Object.assign(this, data);

    if (!this.song) {
      throw 'no songs';
    }
  }
}
