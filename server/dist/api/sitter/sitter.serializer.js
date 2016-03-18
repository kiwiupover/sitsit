'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var serverUrl = 'localhost:9000';

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