'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverUrl = _environment2.default.hostUrl;

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