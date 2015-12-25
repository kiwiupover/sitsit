const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  startDate: String,
  endDate: String,
  sitter: { type: Schema.Types.ObjectId, ref: 'Sitter' },
  client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
