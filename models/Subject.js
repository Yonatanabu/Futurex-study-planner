const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: Number, required: true, enum: [9, 10, 11, 12] },
  chapters: [{ type: String, required: true }],
  curriculumType: { type: String, enum: ['Semester', 'Quarter'], required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);