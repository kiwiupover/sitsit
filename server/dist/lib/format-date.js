'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDate(date) {
  var format = arguments.length <= 1 || arguments[1] === undefined ? 'L' : arguments[1];

  return _moment2.default.utc(date).format(format);
}

exports.default = formatDate;