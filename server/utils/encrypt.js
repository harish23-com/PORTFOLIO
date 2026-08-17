const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';

const getKey = () => {
  const key = process.env.ENCRYPTION_KEY || '';
  return crypto.createHash('sha256').update(key).digest();
};

const getIv = () => {
  const iv = process.env.ENCRYPTION_IV || 'defaultiv16bytes';
  return crypto.createHash('md5').update(iv).digest();
};

const encrypt = (text) => {
  if (!text) return text;
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), getIv());
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encryptedText) => {
  if (!encryptedText) return encryptedText;
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), getIv());
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };
