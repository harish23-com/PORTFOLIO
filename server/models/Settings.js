const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Portfolio' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    footerText: { type: String, default: '' },
    resumeDownloadsCount: { type: Number, default: 0 },
    visitorCount: { type: Number, default: 0 },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: { type: String, default: '' },
      robots: { type: String, default: 'index, follow' },
      canonicalUrl: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      twitterHandle: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
