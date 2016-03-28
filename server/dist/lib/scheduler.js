'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var now = (0, _momentTimezone2.default)().tz("America/Los_Angeles");
  var in1hour = (0, _momentTimezone2.default)(now).subtract(1, 'hours');
  var tomorrowDate = (0, _momentTimezone2.default)(now).add(1, 'days');
  var tomorrowPlus1Hour = (0, _momentTimezone2.default)(tomorrow).add(1, 'hours');

  var today = {
    startTime: in1hour,
    endTime: now,
    sentMessage: 'sentHourBeforeMessage'
  };

  var tomorrow = {
    startTime: tomorrowDate,
    endTime: tomorrowPlus1Hour,
    sentMessage: 'sentDayBeforeMessage'
  };

  var sendingSchedule = [today, tomorrow];

  _nodeSchedule2.default.scheduleJob(hourly, function () {
    sendingSchedule.forEach(function (sender) {

      _schedule2.default.find({

        startDate: {
          $gte: sender.startTime.toDate(),
          $lt: sender.endTime.toDate()
        }

      }).exec(function (err, schedules) {
        if (err) {
          console.log('err', err);
        }

        schedules.forEach(function (schedule) {

          var s = schedule.toJSON();
          if (s[sender.sentMessage]) {
            return;
          }

          schedule[sender.sentMessage] = true;
          schedule.save(function (err) {
            if (err) {
              console.log('schedule save error', err);
            }
          });

          (0, _sendMessages2.default)(schedule);
        });
      });
    });
  });
};

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _sendMessages = require('./send-messages');

var _sendMessages2 = _interopRequireDefault(_sendMessages);

var _schedule = require('../api/schedule/schedule.model');

var _schedule2 = _interopRequireDefault(_schedule);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hourly = new _nodeSchedule2.default.RecurrenceRule();
hourly.minutes = 59;