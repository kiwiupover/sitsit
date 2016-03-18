'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var serverUrl = 'localhost:9000';

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