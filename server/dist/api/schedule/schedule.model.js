'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var Schedule = undefined;

var ScheduleSchema = new Schema({
  startDate: Date,
  endDate: Date,
  sentDayBeforeMessage: Boolean,
  sentHourBeforeMessage: Boolean,
  sitter: { type: Schema.Types.ObjectId, ref: 'Sitter' },
  client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

if (_mongoose2.default.models.Schedule) {
  Schedule = _mongoose2.default.model('Schedule');
} else {
  Schedule = _mongoose2.default.model('Schedule', ScheduleSchema);
}

exports.default = Schedule;