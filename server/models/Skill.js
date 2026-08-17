const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Programming Languages', 'Authentication', 'API Development', 'Version Control', 'Tools'],
    },
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: '' },
    level: { type: Number, min: 0, max: 100, default: 70 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
