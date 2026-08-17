const express = require('express');
const router = express.Router();
const { exportBackup, restoreBackup } = require('../controllers/backupController');
const { protect, authorize } = require('../middleware/auth');

router.get('/export', protect, authorize('admin'), exportBackup);
router.post('/restore', protect, authorize('admin'), restoreBackup);

module.exports = router;
