const Hero = require('../models/Hero');
const Settings = require('../models/Settings');

const uploadResumeFile = async (req, res, next) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'Please upload a valid PDF file' });
    }

    const base64Data = req.file.buffer.toString('base64');
    const originalName = req.file.originalname || 'Resume.pdf';
    const fileSize = req.file.size;
    const contentType = req.file.mimetype || 'application/pdf';

    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({
        name: 'Harish Kumar',
        summary: 'Full Stack Developer',
        resumeFile: '/api/resume/download',
        resumeOriginalName: originalName,
        resumeFileSize: fileSize,
        resumeData: base64Data,
        resumeContentType: contentType,
        resumeUpdatedAt: new Date(),
      });
    } else {
      hero.resumeFile = '/api/resume/download';
      hero.resumeOriginalName = originalName;
      hero.resumeFileSize = fileSize;
      hero.resumeData = base64Data;
      hero.resumeContentType = contentType;
      hero.resumeUpdatedAt = new Date();
      await hero.save();
    }

    res.status(200).json({
      success: true,
      message: 'Resume PDF uploaded and permanently stored in MongoDB',
      data: {
        resumeFile: hero.resumeFile,
        resumeOriginalName: hero.resumeOriginalName,
        resumeFileSize: hero.resumeFileSize,
        resumeUpdatedAt: hero.resumeUpdatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const setResumeUrl = async (req, res, next) => {
  try {
    const { url, originalName } = req.body;
    if (!url || !url.trim()) {
      return res.status(400).json({ success: false, message: 'Resume URL is required' });
    }

    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({
        name: 'Harish Kumar',
        summary: 'Full Stack Developer',
        resumeFile: url.trim(),
        resumeOriginalName: originalName || 'External Resume Link',
        resumeFileSize: 0,
        resumeData: '',
        resumeContentType: 'application/pdf',
        resumeUpdatedAt: new Date(),
      });
    } else {
      hero.resumeFile = url.trim();
      hero.resumeOriginalName = originalName || 'External Resume Link';
      hero.resumeFileSize = 0;
      hero.resumeData = '';
      hero.resumeUpdatedAt = new Date();
      await hero.save();
    }

    res.status(200).json({
      success: true,
      message: 'External Resume URL saved in MongoDB',
      data: {
        resumeFile: hero.resumeFile,
        resumeOriginalName: hero.resumeOriginalName,
        resumeFileSize: hero.resumeFileSize,
        resumeUpdatedAt: hero.resumeUpdatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const hero = await Hero.findOne();
    if (hero) {
      hero.resumeFile = '';
      hero.resumeOriginalName = '';
      hero.resumeFileSize = 0;
      hero.resumeData = '';
      hero.resumeUpdatedAt = null;
      await hero.save();
    }

    res.status(200).json({ success: true, message: 'Resume removed successfully from MongoDB' });
  } catch (error) {
    next(error);
  }
};

const downloadResume = async (req, res, next) => {
  try {
    const hero = await Hero.findOne();
    if (!hero || (!hero.resumeFile && !hero.resumeData)) {
      return res.status(404).json({
        success: false,
        message: 'No resume file has been uploaded yet.',
      });
    }

    try {
      let settings = await Settings.findOne();
      if (!settings) settings = await Settings.create({});
      settings.resumeDownloadsCount = (settings.resumeDownloadsCount || 0) + 1;
      await settings.save();
    } catch (err) {
      console.warn('Failed to increment download count:', err.message);
    }

    const sanitizedName = (hero.name || 'Harish_Kumar').replace(/[^a-zA-Z0-9_-]/g, '_');
    let downloadFileName = `${sanitizedName}_Resume.pdf`;
    if (hero.resumeOriginalName && hero.resumeOriginalName.toLowerCase().endsWith('.pdf')) {
      downloadFileName = hero.resumeOriginalName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    }

    const isView = req.query.view === 'true' || req.query.inline === 'true';
    const disposition = isView ? 'inline' : 'attachment';

    if (hero.resumeData && hero.resumeData.trim().length > 0) {
      const fileBuffer = Buffer.from(hero.resumeData, 'base64');
      res.setHeader('Content-Type', hero.resumeContentType || 'application/pdf');
      res.setHeader('Content-Disposition', `${disposition}; filename="${downloadFileName}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      return res.end(fileBuffer);
    }

    if (hero.resumeFile && (hero.resumeFile.startsWith('http://') || hero.resumeFile.startsWith('https://'))) {
      return res.redirect(hero.resumeFile);
    }

    return res.status(404).json({
      success: false,
      message: 'Resume data not found in database. Please upload a new resume in admin.',
    });
  } catch (error) {
    next(error);
  }
};

const trackDownload = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    settings.resumeDownloadsCount = (settings.resumeDownloadsCount || 0) + 1;
    await settings.save();
    res.status(200).json({ success: true, downloads: settings.resumeDownloadsCount });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadResumeFile,
  setResumeUrl,
  deleteResume,
  downloadResume,
  trackDownload,
};
