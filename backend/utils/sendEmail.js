const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

module.exports = (to, subject, html) =>
  transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });