const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    features: [String],
    technologies: [String],
    images: [String],
    liveDemo: String,
    github: String,
    challenges: String,
    learnings: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Math.random().toString(36).substring(2, 7);
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
