'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var serverUrl = 'localhost:9000';

function clientSerializer(client) {

  this.serialize = function () {
    return new _jsonapiSerializer.Serializer('clients', client, {
      id: '_id',
      topLevelLinks: { self: 'http://' + serverUrl + '/api/clients' },
      dataLinks: {
        self: function self(client) {
          return 'http://' + serverUrl + '/api/clients/' + client._id;
        }
      },
      attributes: ['familyName', 'primaryPhone', 'secondaryPhone']
    });
  };
}

exports.default = clientSerializer;