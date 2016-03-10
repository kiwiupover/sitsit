import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Schedule;

let ScheduleSchema = new Schema({
  startDate: Date,
  endDate: Date,
  sentDayBeforeMessage: Boolean,
  sentHourBeforeMessage: Boolean,
  sitter: { type: Schema.Types.ObjectId, ref: 'Sitter' },
  client: { type: Schema.Types.ObjectId, ref: 'Client' }
});


if (mongoose.models.Schedule) {
  Schedule = mongoose.model('Schedule');
} else {
  Schedule = mongoose.model('Schedule', ScheduleSchema);
}

export default Schedule;
