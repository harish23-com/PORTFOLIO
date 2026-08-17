const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getSmtpConfig, updateSmtpConfig } = require('../controllers/smtpController');

router.get('/', protect, getSmtpConfig);
router.put('/', protect, updateSmtpConfig);

module.exports = router;
