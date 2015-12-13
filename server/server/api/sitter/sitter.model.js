const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SitterSchema = new Schema({
  firstName: String,
  phone: String
});

module.exports = mongoose.model('Sitter', SitterSchema);
