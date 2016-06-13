'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  _nodeSchedule2.default.scheduleJob(hourly, function () {
    (0, _hourBefore2.default)();
    (0, _dayBefore2.default)();
  });
};

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _dayBefore = require('./day-before');

var _dayBefore2 = _interopRequireDefault(_dayBefore);

var _hourBefore = require('./hour-before');

var _hourBefore2 = _interopRequireDefault(_hourBefore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hourly = new _nodeSchedule2.default.RecurrenceRule();
hourly.minutes = 59;