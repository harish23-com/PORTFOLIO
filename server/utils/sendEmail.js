const nodemailer = require('nodemailer');
const SmtpConfig = require('../models/SmtpConfig');
const { decrypt } = require('./encrypt');

const getTransporter = async () => {
  const config = await SmtpConfig.findOne();
  if (!config || !config.host) {
    throw new Error('SMTP is not configured yet. Please configure it in the admin dashboard.');
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.username,
      pass: decrypt(config.password),
    },
  });

  return { transporter, config };
};

const sendEmail = async ({ to, subject, html }) => {
  const { transporter, config } = await getTransporter();

  await transporter.sendMail({
    from: `"${config.senderName}" <${config.senderEmail}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
