// backend/middleware/verifyEmail.js
module.exports = (req, res, next) => {
  // assumes req.user was set by your auth.js middleware
  if (!req.user.isVerified) {
    return res.status(403).json({ message: 'Email not verified' });
  }
  next();
};
