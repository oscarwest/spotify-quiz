import * as express from 'express';
import * as querystring from 'querystring';
import * as cookieParser from 'cookie-parser';
import * as authSettings from './authSettings';

import * as http from 'http';
import * as socketio from 'socket.io';

// Import controllers
import * as homeController from './controllers/spotifyAuthController';
import * as gameController from './controllers/gameController';

const app = express();

// Express variables
const port = 8888;
app.set('port', port);

// Express config
app
  .use(express.static(__dirname + '/public'))
  .use(cookieParser());


// Routes
app.get('/auth/login', homeController.getLogin);
app.get('/auth/callback', homeController.authCallback);
app.get('/auth/refreshToken', homeController.refreshToken);
app.get('/auth/logout', homeController.logout);

// Websocket test frontend
app.get('/game', gameController.getGamePage);



module.exports = app;
