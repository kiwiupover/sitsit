'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Sitter = void 0;

var SitterSchema = new Schema({
  firstName: String,
  phone: String,
  parentPrimaryPhone: String,
  parentSecondayPhone: String
});

if (_mongoose2.default.models.Sitter) {
  Sitter = _mongoose2.default.model('Sitter');
} else {
  Sitter = _mongoose2.default.model('Sitter', SitterSchema);
}

exports.default = Sitter;