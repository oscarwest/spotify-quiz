import { Server } from 'http';

'use strict';

/**
 * Encapsulates all code for emitting and listening to socket events
 *
 */
const ioEvents = (io: SocketIO.Server) => {
  io.on('connect', (socket: any) => {
    console.log('backend ws connection');

    socket.on('create', (gameId: any) => {
      // Save the gameId somewhere?
      console.log('creating gameId' + gameId);
      socket.join(gameId);

      io.to(gameId).emit('gameDataEvent', '{"created game":"yah"}');
    });

    socket.on('join', (gameId: string) => {
      socket.join(gameId);

      io.to(gameId).emit('gameDataEvent', '{"joined":"the game!"}');
    });

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
