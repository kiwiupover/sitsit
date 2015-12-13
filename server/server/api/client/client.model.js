import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  familyName: String,
  phone: String
});

export default mongoose.model('Client', ClientSchema);
