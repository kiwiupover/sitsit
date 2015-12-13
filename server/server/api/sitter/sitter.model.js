const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SitterSchema = new Schema({
  'family-name': String,
  phone: String
});

module.exports = mongoose.model('Sitter', SitterSchema);
