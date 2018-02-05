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

// Setup Promises
// require('any-promise/register/q');
// const rp = require('request-promise-any');


const app = express();
const server = http.createServer(app);

// Cors
// pre-flight
// app.options('*', cors());
const allowedOrigins = ['http://localhost:8888'];
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
process.env.NODE_CONFIG_DIR = './dist/config';

// Express variables
const port = 8888;
app.set('port', port);

// Express config
app
  .use(express.static(__dirname + '/public'))
  .use(cookieParser())
  .use(bodyParser.json());


// stdout errors in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}


// Routes
const authRoutes = require('./routes/spotifyAuthRoutes');
const gameRoutes = require('./routes/gameRoutes');
const testRoutes = require('./routes/testRoutes');
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/test', testRoutes);


// Start the server
server.listen(port, () => {
  console.log('Running server on port %s', port);
});

// get socket stuff
ioServer.init(server).listen();

module.exports = app;
