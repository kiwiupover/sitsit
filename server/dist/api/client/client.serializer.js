'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var _jsonapiSerializer2 = _interopRequireDefault(_jsonapiSerializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverUrl = 'localhost:9000';

function clientSerializer(client) {

  this.serialize = function () {
    return new _jsonapiSerializer2.default('clients', client, {
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