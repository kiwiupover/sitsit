const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SitterSchema = new Schema({
  firstName: String,
  phone: String,
  parentPrimaryPhone: String,
  parentSecondayPhone: String
});

module.exports = mongoose.model('Sitter', SitterSchema);
