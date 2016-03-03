import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Sitter;

const SitterSchema = new Schema({
  firstName: String,
  phone: String,
  parentPrimaryPhone: String,
  parentSecondayPhone: String
});

if (mongoose.models.Sitter) {
  Sitter = mongoose.model('Sitter');
} else {
  Sitter = mongoose.model('Sitter', SitterSchema);
}

export default Sitter;
