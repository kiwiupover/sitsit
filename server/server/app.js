import ENV from 'dotenv';
import scheduler from './lib/scheduler';

ENV.load();

console.log('ENV twilio', process.env.TwilioTesting);

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('ENV Node', process.env.NODE_ENV);

import express from 'express';
import mongoose from 'mongoose';
const config = require('./config/environment');

if (!process.env.NODE_ENV === 'test') {
	scheduler();
}

scheduler();

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
const app = express();
const server = require('http').createServer(app);

app.use(cors({
	allowedOrigins: [
		'sittertracker.com'
	]
}));

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
