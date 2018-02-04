import * as errorHandler from 'errorhandler';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as express from 'express';
import * as querystring from 'querystring';
import * as cookieParser from 'cookie-parser';
import * as authSettings from './authSettings';
import * as ioServer from './sockets';
import * as cors from 'cors';

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);

// Cors
// pre-flight
// app.options('*', cors());
const allowedOrigins = ['http://localhost:3000', 'http://evil.com/'];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));



// Express variables
const port = 8888;
app.set('port', port);

// Express config
app
  .use(express.static(__dirname + '/public'))
  .use(cookieParser());


// stdout errors in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}


// Routes
const authRoutes = require('./routes/spotifyAuthRoutes');
const gameRoutes = require('./routes/gameRoutes');
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);


// Start the server
server.listen(port, () => {
  console.log('Running server on port %s', port);
});

// get socket stuff
ioServer.init(server).listen();

module.exports = app;
