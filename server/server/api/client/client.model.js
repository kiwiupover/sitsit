import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  'first-name': String,
  phone: String
});

export default mongoose.model('Client', ClientSchema);
