const multer = require('multer');
const path = require('path');
const fs = require('fs');

const makeStorage = (subfolder) => {
  const dir = path.join(__dirname, '..', 'uploads', subfolder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
};

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|svg|gif/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only image files are allowed (jpg, png, webp, svg, gif)'));
};

const pdfFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isPdfExt = ext === '.pdf';
  const isPdfMime =
    !file.mimetype ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/x-pdf' ||
    file.mimetype === 'application/acrobat' ||
    file.mimetype === 'applications/vnd.pdf' ||
    file.mimetype === 'text/pdf' ||
    file.mimetype === 'application/octet-stream';

  if (isPdfExt || isPdfMime) {
    return cb(null, true);
  }
  cb(new Error('Only PDF files are allowed (.pdf)'));
};

const uploadImage = (subfolder) =>
  multer({
    storage: makeStorage(subfolder),
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });

const uploadResume = multer({
  storage: multer.memoryStorage(),
  fileFilter: pdfFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
});

module.exports = { uploadImage, uploadResume };
