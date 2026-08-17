const uploadFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const folder = req.uploadFolder || 'images';
  const filePath = `/uploads/${folder}/${req.file.filename}`;
  res.status(200).json({ success: true, data: { url: filePath } });
};

module.exports = { uploadFile };
