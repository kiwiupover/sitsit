import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  familyName: String,
  primaryPhone: String,
  secondaryPhone: String
});

export default mongoose.model('Client', ClientSchema);
