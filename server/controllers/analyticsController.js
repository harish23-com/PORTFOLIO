const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Settings = require('../models/Settings');

const getAnalytics = async (req, res, next) => {
  try {
    const [messageCount, unreadCount, projectCount, certificateCount, settings, recentMessages] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Project.countDocuments(),
      Certificate.countDocuments(),
      Settings.findOne(),
      Contact.find().sort('-createdAt').limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalMessages: messageCount,
        unreadMessages: unreadCount,
        totalProjects: projectCount,
        totalCertificates: certificateCount,
        resumeDownloads: settings ? settings.resumeDownloadsCount : 0,
        visitorCount: settings ? settings.visitorCount : 0,
        recentMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const trackVisit = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    settings.visitorCount += 1;
    await settings.save();
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics, trackVisit };
