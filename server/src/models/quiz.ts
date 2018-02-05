import * as uuid from 'uuid';

export class Quiz {
  id = '';
  hostUserId = '';
  name = '';
  description = '';
  playlistId = '';

  constructor(data: Quiz | {} = {}) {
    Object.assign(this, data);

    if (!this.id) {
      this.id = uuid.v4();
    }
  }
}
