const mongoose = require('mongoose');

const lessonSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'postponed', 'missed'],
    default: 'scheduled'
  },
}, { timestamps: true });

module.exports = mongoose.model('LessonSession', lessonSessionSchema);
