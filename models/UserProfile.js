const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const hobbySchema = new Schema({
    category: {
      type: String,
      required: true
    },
    subCategory: {
      type: [String], // Array of strings
      required: true,
      validate: {
        validator: function(subCategories) {
          return subCategories.length > 0; // Ensure at least one subcategory
        },
        message: 'At least one subcategory is required'
      }
    }
  });

  const timePick = new Schema({
    hour: {
      type: Number,
      required: true
    },
    minute: {
        type: Number,
        required: true
    },
    timeFormat: {
        type: String,
        required: true,
        enum:['AM','PM'],
      },
  });

// UserProfile Schema
const userProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    grade: {
      type: Number,
      required: true,
      enum: [9, 10, 11, 12], // Restrict to values 9-12
      message: "Grade must be between 9 and 12.",
    },
    school: { type: String, default: "" },
    curriculumType: { type: String, required: true }, // Semester or Quarter
    avgGrade: { type: Number, required: true },
    rank: { type: Number, default: null },
    studyTime: timePick,
    studyDuration: { type: Number, required: true },
    weekendStudyHours: { type: Number, required: true },
    preferredTimes: { type: [String], required: true }, // Morning, Afternoon, Evening
    restDay: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    wakeUpTime: timePick,
    learningStyle: { 
        type: [String],
        required: true,
        enum: ["video","shortNote","textBook"]
    }, // Video, Notes, Textbook
    favoriteSubjects: { type: [String], default: [] },
    improveSubjects: { type: [String], default: [] },
    reasonForLoveOfSubject: {
        type: String,
        trim: true,
        maxlength: 500
    },
    finalExamDate: { type: Date, required: true },
    dreamCareer: { type: String, default: "" },
    motivations: { type: [String], default: [] },
    competeWithFriends: { type: Boolean, default: false },
    friendInFuturex: {
        type: Boolean,
        required: true,
        default: false
    },
    friendName: {
        type: String,
        trim: true
    },
    admiredFigure: { type: String, default: "" },
    admiredReason: { type: String, default: "" },
    hobbies: [hobbySchema],
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
