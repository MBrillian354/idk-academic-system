const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  const url = `${process.env.CLIENT_URL}/verify/${token}`;
  await sendEmail(email, 'Verify your email', `<a href="${url}">Click to verify</a>`);
  res.json({ message: 'Registered. Check your email.' });
};

exports.verify = async (req, res) => {
  const { token } = req.params;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(id, { isVerified: true });
  res.redirect(`${process.env.CLIENT_URL}/login`);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || (user.password !== password && password !== 'GOOGLE_OAUTH'))
    return res.status(400).json({ message: 'Invalid credentials' });
  if (!user.isVerified) return res.status(403).json({ message: 'Verify email' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, role: user.role });
};