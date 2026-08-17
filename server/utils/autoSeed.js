const fs = require('fs');
const path = require('path');
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

let seeded = false;

const autoSeedIfEmpty = async () => {
  if (seeded) return;

  try {
    const heroCount = await Hero.countDocuments();
    if (heroCount > 0) {
      seeded = true;
      return;
    }

    const backupPath = path.join(__dirname, 'backup.json');
    if (!fs.existsSync(backupPath)) {
      seeded = true;
      return;
    }

    const raw = fs.readFileSync(backupPath, 'utf-8');
    const data = JSON.parse(raw);

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      if (data.users?.length > 0) {
        for (const u of data.users) {
          await User.create({
            name: u.name || process.env.ADMIN_NAME || 'Harish Kumar',
            email: u.email || process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@12345',
            role: u.role || 'admin',
          });
        }
      } else {
        await User.create({
          name: process.env.ADMIN_NAME || 'Harish Kumar',
          email: process.env.ADMIN_EMAIL || 'admin@example.com',
          password: process.env.ADMIN_PASSWORD || 'Admin@12345',
          role: 'admin',
        });
      }
    }

    if (data.hero) {
      const { _id, createdAt, updatedAt, __v, ...heroData } = data.hero;
      await Hero.create(heroData);
    }

    if (data.about) {
      const { _id, createdAt, updatedAt, __v, ...aboutData } = data.about;
      await About.create(aboutData);
    }

    if (Array.isArray(data.skills) && data.skills.length > 0) {
      const cleanSkills = data.skills.map(({ _id, createdAt, updatedAt, __v, ...s }) => s);
      await Skill.insertMany(cleanSkills);
    }

    if (Array.isArray(data.experience) && data.experience.length > 0) {
      const cleanExp = data.experience.map(({ _id, createdAt, updatedAt, __v, ...e }) => e);
      await Experience.insertMany(cleanExp);
    }

    if (Array.isArray(data.education) && data.education.length > 0) {
      const cleanEdu = data.education.map(({ _id, createdAt, updatedAt, __v, ...e }) => e);
      await Education.insertMany(cleanEdu);
    }

    if (Array.isArray(data.projects) && data.projects.length > 0) {
      const cleanProj = data.projects.map(({ _id, slug, createdAt, updatedAt, __v, ...p }) => p);
      await Project.insertMany(cleanProj);
    }

    if (Array.isArray(data.certificates) && data.certificates.length > 0) {
      const cleanCert = data.certificates.map(({ _id, createdAt, updatedAt, __v, ...c }) => c);
      await Certificate.insertMany(cleanCert);
    }

    if (Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
      const cleanLinks = data.socialLinks.map(({ _id, createdAt, updatedAt, __v, ...l }) => l);
      await SocialLink.insertMany(cleanLinks);
    }

    if (data.settings) {
      const { _id, createdAt, updatedAt, __v, ...settingsData } = data.settings;
      await Settings.create(settingsData);
    }

    seeded = true;
    console.log('Database automatically seeded from backup.json on server start');
  } catch (err) {
    console.error('Auto seed notice:', err.message);
  }
};

module.exports = autoSeedIfEmpty;
