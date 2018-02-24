process.env.NODE_CONFIG_DIR = '.';
console.log('NODE_CONFIG_DIR Set to: ' + process.env.NODE_CONFIG_DIR);

import * as errorHandler from 'errorhandler';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as express from 'express';
import * as querystring from 'querystring';
import * as cookieParser from 'cookie-parser';
import * as config from 'config';
import * as ioServer from './sockets';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const expressValidator = require('express-validator');

const app = express();
const server = http.createServer(app);

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

// Set config dir for dist

// Express variables
const port = 8888;
app.set('port', port);

// Express config
app
  .use(express.static(__dirname + '/public'))
  .use(cookieParser())
  .use(bodyParser.json())
  .use(expressValidator());

// stdout errors in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

// Routes
const gameRoutes = require('./routes/gameRoutes');
const quizRoutes = require('./routes/quizRoutes');
app.use('/game', gameRoutes);
app.use('/quiz', quizRoutes);

// Start the server
server.listen(port, () => {
  console.log('Running server on port %s', port);
});

// get socket stuff
ioServer.init(server).listen();

module.exports = app;
