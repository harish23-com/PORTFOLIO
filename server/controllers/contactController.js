const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const SmtpConfig = require('../models/SmtpConfig');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    const config = await SmtpConfig.findOne();
    if (config && config.host) {
      try {
        await sendEmail({
          to: config.notifyEmail || config.senderEmail,
          subject: `New Contact Message: ${subject}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
        });

        await sendEmail({
          to: email,
          subject: 'Thank you for reaching out',
          html: `<p>Hi ${name},</p><p>Thank you for contacting me. I have received your message and will get back to you shortly.</p>`,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
      }
    }

    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

const replyMessage = async (req, res, next) => {
  try {
    const { replyText } = req.body;
    const message = await Contact.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });

    await sendEmail({
      to: message.email,
      subject: `Re: ${message.subject}`,
      html: `<p>${replyText}</p>`,
    });

    message.replied = true;
    await message.save();

    res.status(200).json({ success: true, message: 'Reply sent successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getMessages, getMessage, replyMessage, deleteMessage };
