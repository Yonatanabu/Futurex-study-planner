
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subjectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject',
    required: true 
  },
  chapter: { type: String, required: true },
  grade: { type: Number, required: true, enum: [9, 10, 11, 12] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);