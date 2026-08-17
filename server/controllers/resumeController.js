const Hero = require('../models/Hero');
const Settings = require('../models/Settings');
const path = require('path');
const fs = require('fs');

const uploadResumeFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
    }

    let hero = await Hero.findOne();
    if (hero && hero.resumeFile) {
      const oldPath = path.join(__dirname, '..', hero.resumeFile);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const filePath = `/uploads/resume/${req.file.filename}`;
    if (!hero) {
      hero = await Hero.create({ name: 'New User', summary: 'Summary', resumeFile: filePath });
    } else {
      hero.resumeFile = filePath;
      await hero.save();
    }

    res.status(200).json({ success: true, data: { resumeFile: filePath } });
  } catch (error) {
    next(error);
  }
};

const trackDownload = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    settings.resumeDownloadsCount += 1;
    await settings.save();
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadResumeFile, trackDownload };
