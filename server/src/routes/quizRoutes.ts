'use strict';

import { Router, Request, Response, NextFunction } from 'express';
import * as path from 'path';
import { QuizService } from '../services/quizService';
import expressValidator = require('express-validator');
import { check, validationResult } from 'express-validator/check';

const router = Router();

router.post('/create', [
  check('userId').exists(),
  check('playlistId').exists(),
  check('quizName').exists(),
  check('description').exists(),
  check('count').exists().isInt(),
],          async (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return Promise.resolve(res.status(422).json({ errors: errors.mapped() }));
  }

  const quizService = new QuizService();
  try {
    const quiz = await quizService.createQuiz(req.body.userId,
                                              req.body.playlistId,
                                              req.body.count,
                                              req.body.quizName,
                                              req.body.description);
    res.json(quiz);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export = router;
