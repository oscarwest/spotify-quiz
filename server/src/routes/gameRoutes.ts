'use strict';

// import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import * as path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {

// export let getGamePage = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/', 'game.html'));
});

export = router;
