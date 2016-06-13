'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDate(date) {
  var format = arguments.length <= 1 || arguments[1] === undefined ? 'L' : arguments[1];


  return _momentTimezone2.default.tz(date, "America/Los_Angeles").format(format);
}

exports.default = formatDate;