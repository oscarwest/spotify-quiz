// const uuidv4 = require('uuid/v4');
import * as uuid from 'uuid';

export class Song {
  id = '';
  title : string;
  artist : string;
  previewUrl : string;

  constructor(data: Song | {} = {}) {
    Object.assign(this, data);
  }
}
