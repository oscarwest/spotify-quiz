'use strict';

import { Server } from 'http';
import { Quiz } from '../models/quiz';
import { Game } from '../models/game';
import { Question } from '../models/question';
import { Song } from '../models/song';
import { GameService } from '../services/gameService';
import { QuizService } from '../services/quizService';

const redis = require('redis');
const client = redis.createClient();

/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
const ioEvents = (io: SocketIO.Server) => {
  io.origins('*:*'); // for latest version

  io.on('connect', (socket: any) => {
    console.log('backend ws connection');

    // Create a Game
    socket.on('create', async (data: any) => {
      const gameService = new GameService();
      const game = await gameService.createGame(data.quiz);

      socket.join(game.id);
      io.to(game.id).emit('gameCreatedEvent', JSON.stringify(game));
    });

    // Join a Game
    socket.on('join', (userName: string, gameId: string) => {
      socket.join(gameId);

      io.to(gameId).emit('userJoinedGameEvent', `{ "userName": "${userName}" }`);
    });

    socket.on('answer', (data: any) => {
      const room = data.gameId;
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

    socket.on('nextQuestion', (room: string) => {
      io.sockets.in(room).emit('nextQuestionEvent');
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
