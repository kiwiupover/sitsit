const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  date: String,
  time: String,
  _sitter: { type: Schema.Types.ObjectId, ref: 'Sitter' },
  _client: { type: Schema.Types.ObjectId, ref: 'Client' }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
