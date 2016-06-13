'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _schedule = require('../api/schedule/schedule.model');

var _schedule2 = _interopRequireDefault(_schedule);

var _formatDate = require('./format-date');

var _formatDate2 = _interopRequireDefault(_formatDate);

var _sendMessage = require('./send-message');

var _sendMessage2 = _interopRequireDefault(_sendMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * return an array of phone numbers
 */
// TODO: refactor phonenumber into own model.
function phoneNumbers(model) {
  var phoneNumbers = [];

  isPhonePresentPushNumber(model.client.primaryPhone, phoneNumbers);
  isPhonePresentPushNumber(model.client.secondaryPhone, phoneNumbers);
  isPhonePresentPushNumber(model.sitter.phone, phoneNumbers);
  isPhonePresentPushNumber(model.sitter.parentPrimaryPhone, phoneNumbers);
  isPhonePresentPushNumber(model.sitter.parentSecondayPhone, phoneNumbers);

  return phoneNumbers;
}

function isPhonePresentPushNumber(phoneNumber, array) {
  if (phoneNumber) {
    return array.push(phoneNumber);
  }
}

function isToday(date) {
  var dateStartOfDay = (0, _moment2.default)(date).startOf('day');
  var today = (0, _moment2.default)().startOf('day');

  return dateStartOfDay.isSame(today);
}

function isTomorrow(date) {
  var dateStartOfDay = (0, _moment2.default)(date).startOf('day');
  var tomorrow = (0, _moment2.default)().add(1, 'days').startOf('day');

  return dateStartOfDay.isSame(tomorrow);
}

function messageDate(date) {
  var messageDate = void 0;

  switch (true) {
    case isToday(date):
      messageDate = 'today';
      break;
    case isTomorrow(date):
      messageDate = 'tomorrow';
      break;
    default:
      var formatedDate = (0, _formatDate2.default)(date, 'ddd MMM Do');
      messageDate = 'on ' + formatedDate;
  }

  return messageDate;
}

function sendMessages(model) {
  _schedule2.default.populate(model, 'client sitter', function (err, schedule) {
    var date = messageDate(schedule.startDate);
    var startTime = (0, _formatDate2.default)(schedule.startDate, 'h:mm A');
    var endTime = (0, _formatDate2.default)(schedule.endDate, 'h:mm A');
    var message = '';

    if (process.env.TwilioTesting === 'true') {
      message += 'This is only a test. ';
    }

    message += schedule.sitter.firstName + ' is baby sitting for the ' + schedule.client.familyName + '\'s ' + date;
    message += ' starting at ' + startTime + ' finishing about ' + endTime;

    (0, _sendMessage2.default)(phoneNumbers(schedule), message, function () {
      return serializer(schedule.toObject(), res);
    });
  });
}

exports.default = sendMessages;