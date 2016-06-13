'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverUrl = _environment2.default.hostUrl;

function sitterSerializer(sitter) {

  this.serialize = function () {
    return new _jsonapiSerializer.Serializer('sitters', sitter, {
      id: '_id',
      topLevelLinks: { self: 'http://' + serverUrl + '/api/sitters' },
      dataLinks: {
        self: function self(sitter) {
          return 'http://' + serverUrl + '/api/sitters/' + sitter._id;
        }
      },
      attributes: ['firstName', 'phone', 'parentPrimaryPhone', 'parentSecondayPhone']
    });
  };
}

exports.default = sitterSerializer;