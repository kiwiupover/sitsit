/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/schedules', require('./api/schedule'));
  app.use('/api/clients', require('./api/client'));
  app.use('/api/sitters', require('./api/sitter'));
};