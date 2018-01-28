// 'use strict';


// import * as Mongoose from 'mongoose';
// import { log } from 'util';
// import { MongoClient } from 'mongodb';
// import * as config from 'config';

// // Connect to the database
// // construct the database URI and encode username and password.
// const dbURI = config.get('MongoDb.Uri');
// Mongoose.connect(dbURI);

// // Throw an error if the connection fails
// Mongoose.connection.on('error', (err: any) => {
//   if (err) throw err;
// });

// // mpromise (mongoose's default promise library) is deprecated,
// // Plug-in your own promise library instead.
// // Use native promises
// (<any>Mongoose.Promise) = global.Promise;

// module.exports = { Mongoose,
//   models: {
//     user: require('./schemas/user.js'),
//   },
// };
