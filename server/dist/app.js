'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _scheduler = require('./lib/scheduler');

var _scheduler2 = _interopRequireDefault(_scheduler);

var _expressCors = require('express-cors');

var _expressCors2 = _interopRequireDefault(_expressCors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

console.log('ENV twilio', process.env.TwilioTesting);

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('ENV Node', process.env.NODE_ENV);

var config = require('./config/environment');

if (!process.env.NODE_ENV === 'test') {
	(0, _scheduler2.default)();
}

// Connect to database
_mongoose2.default.connect(config.mongo.uri, config.mongo.options);
_mongoose2.default.connection.on('error', function (err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});
// Populate DB with sample data
if (config.seedDB) {
	require('./config/seed');
}

// Setup server
var app = (0, _express2.default)();
var server = require('http').createServer(app);

console.log('corsUrl', config.corsUrl);
app.use((0, _expressCors2.default)({
	allowedOrigins: [config.corsUrl, 'sitter-client.surge.sh']
}));

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;