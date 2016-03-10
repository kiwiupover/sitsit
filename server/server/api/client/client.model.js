import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Client;

const ClientSchema = new Schema({
  familyName: String,
  primaryPhone: String,
  secondaryPhone: String
});

if (mongoose.models.Client) {
  Client = mongoose.model('Client');
} else {
  Client = mongoose.model('Client', ClientSchema);
}

export default Client;
