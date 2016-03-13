'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Client = undefined;

var ClientSchema = new Schema({
  familyName: String,
  primaryPhone: String,
  secondaryPhone: String
});

if (_mongoose2.default.models.Client) {
  Client = _mongoose2.default.model('Client');
} else {
  Client = _mongoose2.default.model('Client', ClientSchema);
}

exports.default = Client;