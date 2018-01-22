import * as errorHandler from 'errorhandler';
import * as http from 'http';
import * as socketIo from 'socket.io';
import { Message } from './models/message';
import { Game } from './models/game';

const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server);
const port = 8888;

// stdout errors in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

// Start the server
server.listen(port, () => {
  console.log('Running server on port %s', port);
});

// Websockets setup
io.on('connect', (socket: any) => {
  console.log('backend ws connection');

  /**
   * Create game
   */
  socket.on('create', (gameId: any) => {
    // Save the gameId somewhere?
    console.log('creating gameId' + gameId);
    socket.join(gameId);

    // Call to GameDataService..
    // const gameData: Game = new Game;

    io.to(gameId).emit('gameDataEvent', '{"created game":"yah"}');
  });

  /**
   * Join Game
   */
  socket.on('join', (gameId: string) => {
    socket.join(gameId);

    io.to(gameId).emit('gameDataEvent', '{"joined":"the game!"}');
  });

  /**
   * Game Answers?
   */
  socket.on('answer', (room: any) => {
    // Save stuff with redis here
    // or memcached/
    // if we already need it for distributed app

    // ACK answer received?
    // io.sockets.in(room).emit('gameDataEvent', '{"somedaata":"yah"}');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export = server;
