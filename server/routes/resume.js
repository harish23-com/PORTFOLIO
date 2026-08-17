const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { uploadResumeFile, trackDownload } = require('../controllers/resumeController');
const { uploadResume } = require('../middleware/upload');

router.post('/', protect, uploadResume.single('resume'), uploadResumeFile);
router.post('/track-download', trackDownload);

module.exports = router;
