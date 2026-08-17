const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    image: { type: String, default: '' },
    timeline: [
      {
        year: String,
        title: String,
        description: String,
        type: { type: String, enum: ['education', 'experience', 'achievement'], default: 'experience' },
      },
    ],
    personalInfo: {
      nationality: String,
      email: String,
      phone: String,
      location: String,
    },
    languages: [{ name: String, level: String }],
    interests: [String],
    achievements: [{ title: String, description: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
