'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sitsit-test'
  },

  hostUrl: 'localhost:9001',
  corsUrl: 'localhost:4201',

  seedDB: false
};
