'use strict';

import { Request, Response, NextFunction } from 'express';
import * as path from 'path';

export let getGamePage = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/', 'game.html'));
};
