const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { uploadFile } = require('../controllers/uploadController');
const { uploadImage } = require('../middleware/upload');

router.post('/images', protect, (req, res, next) => { req.uploadFolder = 'images'; next(); }, uploadImage('images').single('image'), uploadFile);
router.post('/certificates', protect, (req, res, next) => { req.uploadFolder = 'certificates'; next(); }, uploadImage('certificates').single('image'), uploadFile);

module.exports = router;
