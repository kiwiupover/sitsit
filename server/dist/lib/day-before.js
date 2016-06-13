'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var now = (0, _momentTimezone2.default)().tz("America/Los_Angeles");
  var tomorrowDate = (0, _momentTimezone2.default)(now).clone().add(1, 'days');
  var tomorrowPlus1Hour = (0, _momentTimezone2.default)(tomorrowDate).clone().add(1, 'hours');

  _schedule2.default.find({

    startDate: {
      $gte: tomorrowDate.format(),
      $lt: tomorrowPlus1Hour.format()
    },
    sentDayBeforeMessage: false

  }).exec(function (err, schedules) {

    if (err) {
      console.log('err', err);
    }

    if (schedules.length === 0) {
      console.log('No day before schedules to process');
    }

    return schedules.forEach(function (schedule) {
      schedule.sentDayBeforeMessage = true;
      return schedule.save(function (err, savedSchedule) {
        if (err) {
          console.log('schedule save error', err);
        }
        console.log('savedSchedule', savedSchedule);
        console.log('schedule', schedule);
        return (0, _sendMessages2.default)(schedule);
      });
    });
  });
};

var _sendMessages = require('./send-messages');

var _sendMessages2 = _interopRequireDefault(_sendMessages);

var _schedule = require('../api/schedule/schedule.model');

var _schedule2 = _interopRequireDefault(_schedule);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }