'use strict';

import { Server } from 'http';
import { Quiz } from '../models/quiz';
import { Game } from '../models/game';
import { Question } from '../models/question';
import { Song } from '../models/song';
import { GameService } from '../services/gameService';
import { QuizService } from '../services/quizService';

const redis = require('redis');
const client = redis.createClient(6379, 'redis');

const ioEvents = (io: SocketIO.Server) => {
  io.origins('*:*'); // for latest version

  io.on('connect', (socket: any) => {
    console.log('backend ws connection');

    socket.on('WS_CREATE_GAME', async (data: Quiz) => {
      const gameService = new GameService();
      const game = await gameService.createGame(data);

      socket.join(game.id);
      io.to(game.id).emit('WS_GAME_CREATED', JSON.stringify(game));
    });

    socket.on('WS_JOIN_GAME', (data: any) => {
      socket.join(data.id);

      io.to(data.id).emit('WS_USER_JOINED_GAME', `{ "userName": "${data.userName}" }`);
    });

    socket.on('WS_LAUNCH_GAME', (data: any) => {
      const now = new Date().toISOString();
      io.to(data.id).emit('WS_GAME_STARTED', `
        { "questionNumber": 0, "timestamp": "${now}" }
      `);
    });

    // Set Game State
    // socket.on('setstate', async (data: any) => {
    //   // set redis state
    // });


    // Answer a question
    socket.on('WS_CLIENT_ANSWER', (data: any) => {
      const room = data.id;
      const userName = data.userName;
      const answer = data.answer;
      const question = data.question;

      const res = {
        userName,
        answer,
        question,
      };

      io.sockets.in(room).emit('answerReceivedEvent', JSON.stringify(res));
    });

    // Next question
    socket.on('WS_NEXT_QUESTION', (data: any) => {
      const now = new Date().toISOString();
      io.to(data.id).emit('WS_NEXT_QUESTION_RESPONSE', `
        { "questionNumber": ${data.questionNumber}, "timestamp": "${now}" }
      `);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

/**
 * Initialize Socket.io
 * Uses Redis as Adapter for Socket.io
 *
 */
export const init = (server: Server) => {
  // const server = require('http').Server(app);
  const io = require('socket.io')(server);

  // // Force Socket.io to ONLY use "websockets"; No Long Polling.
  //   io.set('transports', ['websocket']);

  // // Using Redis
  //   const port = config.redis.port;
  //   const host = config.redis.host;
  //   const password = config.redis.password;
  //   const pubClient = redis(port, host, { auth_pass: password });
  //   const subClient = redis(port, host, { auth_pass: password, return_buffers: true });
  //   io.adapter(adapter({ pubClient, subClient }));

  // // Allow sockets to access session data
  //   io.use((socket, next) => {
  //     require('../session')(socket.request, {}, next);
  //   });

  // Define all Events
  ioEvents(io);

  // The server object will be then used to list to a port number
  return server;
};
