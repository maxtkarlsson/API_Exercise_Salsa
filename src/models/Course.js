const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  previousKnowledge: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  instructors: {
    type: [String],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  occasions: {
    type: Number,
    required: true,
    max: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  danceType: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  term: {
    type: String,
    required: true,
  },
  classLengthMins: {
    type: Number,
    required: true,
  },
  couplesDance: {
    type: Boolean,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
    max: 30,
  },
  participants: {
    type: [
      {
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        mail: {
          type: String,
          required: true,
        },
        telephone: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Course", CourseSchema);
