'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sitsit-dev'
  },

  hostUrl: 'localhost:9000',
  corsUrl: 'localhost:4200',

  seedDB: false
};
