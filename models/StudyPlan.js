const mongoose = require('mongoose');

const chapterProgressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isFinishedReading: { type: Boolean, default: false }
});

const studyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true
  },
  planType: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
  isPlanned: { type: Boolean, default: false },
  grade: { type: Number, required: true, enum: [9, 10, 11, 12] },
  subjectName: { type: String, required: true },
  chapters: [chapterProgressSchema],
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date } // For automatic deletion
});

// Auto-delete expired plans
studyPlanSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);