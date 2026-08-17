const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { submitContact, getMessages, getMessage, replyMessage, deleteMessage } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.post('/:id/reply', protect, replyMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
