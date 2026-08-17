const mongoose = require('mongoose');

const smtpConfigSchema = new mongoose.Schema(
  {
    host: { type: String, default: '' },
    port: { type: Number, default: 587 },
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    senderName: { type: String, default: '' },
    senderEmail: { type: String, default: '' },
    notifyEmail: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SmtpConfig', smtpConfigSchema);
