const { singletonController, listController } = require('./factory');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const SocialLink = require('../models/SocialLink');
const Settings = require('../models/Settings');

const heroController = singletonController(Hero);
const aboutController = singletonController(About);
const settingsController = singletonController(Settings);

const skillController = listController(Skill, { filterableFields: ['category'], sortField: 'order' });
const experienceController = listController(Experience, { sortField: '-order' });
const educationController = listController(Education, { sortField: '-order' });
const projectController = listController(Project, { filterableFields: ['featured'], sortField: '-order' });
const certificateController = listController(Certificate, { sortField: '-order' });
const socialLinkController = listController(SocialLink, { sortField: 'order' });

module.exports = {
  heroController,
  aboutController,
  settingsController,
  skillController,
  experienceController,
  educationController,
  projectController,
  certificateController,
  socialLinkController,
};
