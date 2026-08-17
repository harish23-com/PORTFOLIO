const User = require('../models/User');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const SocialLink = require('../models/SocialLink');
const Settings = require('../models/Settings');
const Contact = require('../models/Contact');
const SmtpConfig = require('../models/SmtpConfig');

exports.exportBackup = async (req, res, next) => {
  try {
    const [
      users,
      hero,
      about,
      skills,
      experience,
      education,
      projects,
      certificates,
      socialLinks,
      settings,
      contacts,
      smtpConfig
    ] = await Promise.all([
      User.find({}).select('-password'),
      Hero.findOne({}),
      About.findOne({}),
      Skill.find({}).sort({ order: 1 }),
      Experience.find({}).sort({ order: 1 }),
      Education.find({}).sort({ order: 1 }),
      Project.find({}).sort({ order: 1 }),
      Certificate.find({}).sort({ order: 1 }),
      SocialLink.find({}).sort({ order: 1 }),
      Settings.findOne({}),
      Contact.find({}).sort({ createdAt: -1 }),
      SmtpConfig.findOne({}),
    ]);

    const backupData = {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      users,
      hero,
      about,
      skills,
      experience,
      education,
      projects,
      certificates,
      socialLinks,
      settings,
      contacts,
      smtpConfig
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=portfolio-backup-${Date.now()}.json`);
    return res.status(200).json(backupData);
  } catch (error) {
    next(error);
  }
};

exports.restoreBackup = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid backup file payload' });
    }

    if (data.hero) {
      await Hero.deleteMany({});
      const { _id, createdAt, updatedAt, __v, ...heroData } = data.hero;
      await Hero.create(heroData);
    }

    if (data.about) {
      await About.deleteMany({});
      const { _id, createdAt, updatedAt, __v, ...aboutData } = data.about;
      await About.create(aboutData);
    }

    if (Array.isArray(data.skills) && data.skills.length > 0) {
      await Skill.deleteMany({});
      for (const s of data.skills) {
        const { _id, createdAt, updatedAt, __v, ...item } = s;
        await Skill.create(item);
      }
    }

    if (Array.isArray(data.experience) && data.experience.length > 0) {
      await Experience.deleteMany({});
      for (const e of data.experience) {
        const { _id, createdAt, updatedAt, __v, ...item } = e;
        await Experience.create(item);
      }
    }

    if (Array.isArray(data.education) && data.education.length > 0) {
      await Education.deleteMany({});
      for (const ed of data.education) {
        const { _id, createdAt, updatedAt, __v, ...item } = ed;
        await Education.create(item);
      }
    }

    if (Array.isArray(data.projects) && data.projects.length > 0) {
      await Project.deleteMany({});
      for (const p of data.projects) {
        const { _id, slug, createdAt, updatedAt, __v, ...item } = p;
        await Project.create(item);
      }
    }

    if (Array.isArray(data.certificates) && data.certificates.length > 0) {
      await Certificate.deleteMany({});
      for (const c of data.certificates) {
        const { _id, createdAt, updatedAt, __v, ...item } = c;
        await Certificate.create(item);
      }
    }

    if (Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
      await SocialLink.deleteMany({});
      for (const l of data.socialLinks) {
        const { _id, createdAt, updatedAt, __v, ...item } = l;
        await SocialLink.create(item);
      }
    }

    if (data.settings) {
      await Settings.deleteMany({});
      const { _id, createdAt, updatedAt, __v, ...settingsData } = data.settings;
      await Settings.create(settingsData);
    }

    if (Array.isArray(data.contacts) && data.contacts.length > 0) {
      await Contact.deleteMany({});
      for (const c of data.contacts) {
        const { _id, createdAt, updatedAt, __v, ...item } = c;
        await Contact.create(item);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Database backup restored successfully',
    });
  } catch (error) {
    next(error);
  }
};
