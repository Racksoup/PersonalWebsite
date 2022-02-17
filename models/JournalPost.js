const mongoose = require('mongoose');

const JournalPostSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image_filename: { type: String },
});

module.exports = JournalPost = mongoose.model('journalPost', JournalPostSchema);
