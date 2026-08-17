const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  uploadResumeFile,
  setResumeUrl,
  deleteResume,
  downloadResume,
  trackDownload,
} = require('../controllers/resumeController');
const { uploadResume } = require('../middleware/upload');

router.get('/download', downloadResume);
router.post('/', protect, uploadResume.single('resume'), uploadResumeFile);
router.put('/url', protect, setResumeUrl);
router.delete('/', protect, deleteResume);
router.post('/track-download', trackDownload);

module.exports = router;
