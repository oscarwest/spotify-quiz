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

  // Rooms
  socket.on('create', (room: any) => {
    console.log('creating room' + room);
    socket.join(room);

    // Call to GameDataService..
    // const gameData: Game = new Game;

    io.sockets.in(room).emit('gameDataEvent', '{"somedaata":"yah"}');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export = server;
