const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getAnalytics, trackVisit } = require('../controllers/analyticsController');

router.get('/', protect, getAnalytics);
router.post('/track-visit', trackVisit);

module.exports = router;
