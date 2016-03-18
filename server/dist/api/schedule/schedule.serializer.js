'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverUrl = _environment2.default.hostUrl;

function scheduleSerializer(schedule) {

  this.serialize = function () {
    return new _jsonapiSerializer.Serializer('schedules', schedule, {
      id: '_id',
      topLevelLinks: { self: 'http://' + serverUrl + '/api/schedules' },
      dataLinks: {
        self: function self(schedule) {
          return 'http://' + serverUrl + '/api/schedules/' + schedule._id;
        }
      },
      attributes: ['startDate', 'endDate', 'sentDayBeforeMessage', 'sentHourBeforeMessage', 'sitter', 'client'],
      sitter: {
        ref: '_id',
        attributes: ['firstName', 'phone'],
        relationshipLinks: {
          self: function self(schedule, sitter) {
            return 'http://' + serverUrl + '/api/sitters/' + sitter._id;
          },
          "related": 'http://' + serverUrl + '/api/sitters'
        },
        includedLinks: {
          self: function self(schedule, sitter) {
            return 'http://' + serverUrl + '/api/sitters/' + sitter._id;
          }
        }
      },
      client: {
        ref: '_id',
        attributes: ['familyName', 'phone'],
        relationshipLinks: {
          self: function self(schedule, client) {
            return 'http://' + serverUrl + '/api/clients/' + client._id;
          },
          "related": 'http://' + serverUrl + '/api/clients'
        },
        includedLinks: {
          self: function self(schedule, client) {
            return 'http://' + serverUrl + '/api/clients/' + client._id;
          }
        }
      }
    });
  };
}

exports.default = scheduleSerializer;