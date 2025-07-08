const Score = require('../models/Score');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.createScore = async (req, res) => {
  const { student, subject, score, feedback } = req.body;
  const newScore = await Score.create({ student, subject, score, feedback });
  const studentUser = await User.findById(student);
  await sendEmail(
    studentUser.email,
    'New Score Uploaded',
    `<p>Hi ${studentUser.name},</p>
     <p>Your new score in <strong>${subject}</strong> is <strong>${score}</strong>.</p>
     <p>Feedback: ${feedback}</p>`
  );
  res.json(newScore);
};

exports.getScores = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const query = req.user.role === 'student' ? { student: req.user._id } : {};
  const scores = await Score.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(scores);
};

exports.getScore = async (req, res) => {
  const score = await Score.findById(req.params.id);
  res.json(score);
};

exports.updateScore = async (req, res) => {
  const updated = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteScore = async (req, res) => {
  await Score.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};