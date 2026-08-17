require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');

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

const run = async () => {
  await connectDB();

  const backupPath = path.join(__dirname, 'backup.json');

  if (fs.existsSync(backupPath)) {
    const raw = fs.readFileSync(backupPath, 'utf-8');
    const data = JSON.parse(raw);

    await User.deleteMany({});
    if (data.users && data.users.length > 0) {
      for (const u of data.users) {
        await User.create({
          name: u.name || process.env.ADMIN_NAME,
          email: u.email || process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD || 'Admin@12345',
          role: u.role || 'admin'
        });
      }
    } else {
      await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });
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

    if (data.skills?.length > 0) {
      await Skill.deleteMany({});
      const cleanSkills = data.skills.map(({ _id, createdAt, updatedAt, __v, ...s }) => s);
      await Skill.insertMany(cleanSkills);
    }

    if (data.experience?.length > 0) {
      await Experience.deleteMany({});
      const cleanExp = data.experience.map(({ _id, createdAt, updatedAt, __v, ...e }) => e);
      await Experience.insertMany(cleanExp);
    }

    if (data.education?.length > 0) {
      await Education.deleteMany({});
      const cleanEdu = data.education.map(({ _id, createdAt, updatedAt, __v, ...e }) => e);
      await Education.insertMany(cleanEdu);
    }

    if (data.projects?.length > 0) {
      await Project.deleteMany({});
      const cleanProj = data.projects.map(({ _id, createdAt, updatedAt, __v, ...p }) => p);
      await Project.insertMany(cleanProj);
    }

    if (data.certificates?.length > 0) {
      await Certificate.deleteMany({});
      const cleanCert = data.certificates.map(({ _id, createdAt, updatedAt, __v, ...c }) => c);
      await Certificate.insertMany(cleanCert);
    }

    if (data.socialLinks?.length > 0) {
      await SocialLink.deleteMany({});
      const cleanLinks = data.socialLinks.map(({ _id, createdAt, updatedAt, __v, ...l }) => l);
      await SocialLink.insertMany(cleanLinks);
    }

    if (data.settings) {
      await Settings.deleteMany({});
      const { _id, createdAt, updatedAt, __v, ...settingsData } = data.settings;
      await Settings.create(settingsData);
    }

    if (data.contacts?.length > 0) {
      await Contact.deleteMany({});
      const cleanContacts = data.contacts.map(({ _id, createdAt, updatedAt, __v, ...c }) => c);
      await Contact.insertMany(cleanContacts);
    }

    if (data.smtpConfig) {
      await SmtpConfig.deleteMany({});
      const { _id, createdAt, updatedAt, __v, ...smtpData } = data.smtpConfig;
      await SmtpConfig.create(smtpData);
    }

    console.log('Database successfully seeded from backup.json');
  } else {
    console.log('No backup.json found. Creating default admin user.');
    await User.deleteMany({});
    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    });
  }

  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
