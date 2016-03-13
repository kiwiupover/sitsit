'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var _jsonapiSerializer2 = _interopRequireDefault(_jsonapiSerializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverUrl = 'localhost:9000';

function sitterSerializer(sitter) {

  this.serialize = function () {
    return new _jsonapiSerializer2.default('sitters', sitter, {
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