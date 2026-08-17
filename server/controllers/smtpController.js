const SmtpConfig = require('../models/SmtpConfig');
const { encrypt } = require('../utils/encrypt');

const getSmtpConfig = async (req, res, next) => {
  try {
    let config = await SmtpConfig.findOne();
    if (!config) config = await SmtpConfig.create({});
    const safeConfig = config.toObject();
    safeConfig.password = safeConfig.password ? '********' : '';
    res.status(200).json({ success: true, data: safeConfig });
  } catch (error) {
    next(error);
  }
};

const updateSmtpConfig = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.password && payload.password !== '********') {
      payload.password = encrypt(payload.password);
    } else {
      delete payload.password;
    }

    let config = await SmtpConfig.findOne();
    if (!config) {
      config = await SmtpConfig.create(payload);
    } else {
      config = await SmtpConfig.findByIdAndUpdate(config._id, payload, { new: true, runValidators: true });
    }

    const safeConfig = config.toObject();
    safeConfig.password = safeConfig.password ? '********' : '';
    res.status(200).json({ success: true, data: safeConfig });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSmtpConfig, updateSmtpConfig };
