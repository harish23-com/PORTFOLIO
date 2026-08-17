require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
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

const exportData = async () => {
  await connectDB();

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
    User.find({}),
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

  const backupPath = path.join(__dirname, 'backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf-8');
  console.log('Database successfully exported to:', backupPath);
  process.exit(0);
};

exportData().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
