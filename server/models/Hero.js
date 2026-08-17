const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    roles: [{ type: String, trim: true }],
    summary: { type: String, required: true, maxlength: 500 },
    heroImage: { type: String, default: '' },
    resumeFile: { type: String, default: '' },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
