const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  heroController,
  aboutController,
  settingsController,
  skillController,
  experienceController,
  educationController,
  projectController,
  certificateController,
  socialLinkController,
} = require('../controllers/contentControllers');

router.get('/hero', heroController.get);
router.put('/hero', protect, heroController.update);

router.get('/about', aboutController.get);
router.put('/about', protect, aboutController.update);

router.get('/settings', settingsController.get);
router.put('/settings', protect, settingsController.update);

router.get('/skills', skillController.getAll);
router.post('/skills', protect, skillController.create);
router.put('/skills/:id', protect, skillController.update);
router.delete('/skills/:id', protect, skillController.remove);

router.get('/experience', experienceController.getAll);
router.post('/experience', protect, experienceController.create);
router.put('/experience/:id', protect, experienceController.update);
router.delete('/experience/:id', protect, experienceController.remove);

router.get('/education', educationController.getAll);
router.post('/education', protect, educationController.create);
router.put('/education/:id', protect, educationController.update);
router.delete('/education/:id', protect, educationController.remove);

router.get('/projects', projectController.getAll);
router.get('/projects/:id', projectController.getOne);
router.post('/projects', protect, projectController.create);
router.put('/projects/:id', protect, projectController.update);
router.delete('/projects/:id', protect, projectController.remove);

router.get('/certificates', certificateController.getAll);
router.post('/certificates', protect, certificateController.create);
router.put('/certificates/:id', protect, certificateController.update);
router.delete('/certificates/:id', protect, certificateController.remove);

router.get('/social-links', socialLinkController.getAll);
router.post('/social-links', protect, socialLinkController.create);
router.put('/social-links/:id', protect, socialLinkController.update);
router.delete('/social-links/:id', protect, socialLinkController.remove);

module.exports = router;
